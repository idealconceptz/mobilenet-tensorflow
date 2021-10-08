import { FC, useEffect, useState } from "react";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "./components/Image";
import Predictions from "./components/Predictions";
import Upload from "./components/Upload";

interface IResponse {
  className: string;
  probability: number;
}

const imageList = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS66EeVBELXd8Ei_r6RXEJ9FCisZnndVQHbHA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjhpeGhRi6wan5od1hwW_cgIPoxwQeOGYag&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7SzIgMAIf4DoK6vax_J4Gdym_k9UozxBmQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdLnHxNgCCIIjuu7rKVeOJ5rJ1f9hBiC0cFQ&usqp=CAU",
  "https://www.abbuildingproducts.co.uk/media/catalog/product/cache/c62f8caaddd959803e7f4e4e311d049f/6/7/67664_rl-chw.jpg",
  "https://cdn.shopify.com/s/files/1/2224/6235/products/Prod_Wicket_8x10_530x@2x.jpg?v=1613762422",
  "https://m.media-amazon.com/images/I/714+PqmrRrL._AC_SX466_.jpg",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-tee-1623337322.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*",
  "https://cdn.shopify.com/s/files/1/0074/1307/1990/products/TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4_900x900.png?v=1601054861",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Football_%28soccer_ball%29.svg/1200px-Football_%28soccer_ball%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Fat_Tire_Bike_by_Ensey_Motorized_Bikes.jpg/1200px-Fat_Tire_Bike_by_Ensey_Motorized_Bikes.jpg",
  "https://media.4rgos.it/i/Argos/8577889_R_Z001A?w=750&h=440&qlt=70",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Roger_Federer_2012_Indian_Wells.jpg/1200px-Roger_Federer_2012_Indian_Wells.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/34/Nokia_3310_3G_%2820180116%29.jpg",
  "https://68.cdn.ekm.net/ekmps/shops/funkychunky1/images/Chopwell-Dining-Table-2056-p.jpg?v=1",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Football_iu_1996.jpg/1200px-Football_iu_1996.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Atari-2600-Joystick.jpg/1200px-Atari-2600-Joystick.jpg",
  "https://images.immediate.co.uk/production/volatile/sites/7/2019/11/174.GettyImages-87355209-8d0f087-e1573057077709.jpg?quality=90&resize=768,574",
  "https://cdn.cnn.com/cnnnext/dam/assets/191108113710-01-rhino-photography-restricted-full-169.jpg",
];

const App: FC = () => {
  const [predictions, setPredictions] = useState<any>([]);
  const [imageAnimate, setImageAnimate] = useState(false);
  const [predictionAnimate, setPredictionAnimate] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [imageSrc, setImageSrc] = useState(imageList[0]);
  const [isError, setIsError] = useState(false);
  const minCount = 0;
  const maxCount = imageList.length - 1;

  const uploadImage = (e: any) => {
    setImageAnimate(false);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  const getImageFromUrl = (e: any) => {
    setImageAnimate(false);
    setImageSrc(e.target.value);
  };

  const buildPredictionArray = (obj: IResponse) => {
    const array = [];
    for (const [key, value] of Object.entries(obj)) {
      array.push({
        rank: Number(key) + 1,
        item: value.className,
        probability: value.probability,
      });
    }
    setPredictions(array);
  };

  const analyseImage = async (imageToClassify: HTMLImageElement) => {
    setImageAnimate(true);
    setPredictionAnimate(false);
    setIsError(false);
    const version = 2;
    const alpha = 1;
    const model = await mobilenet.load({ version, alpha });
    const topk = 10;
    const response: any = await model.classify(imageToClassify, topk);
    buildPredictionArray(response);
    setPredictionAnimate(true);
  };

  const goLeft = () => {
    const prevImage = imageCount - 1 < minCount ? maxCount : imageCount - 1;
    setImageSrc(imageList[prevImage]);
    setImageCount(prevImage);
    setImageAnimate(false);
  };
  const goRight = () => {
    const nextImage = imageCount + 1 > maxCount ? minCount : imageCount + 1;
    setImageAnimate(false);
    setImageSrc(imageList[nextImage]);
    setImageCount(nextImage);
  };
  const onError = (e: any) => {
    if (e.target.id === "img") {
      setIsError(true);
    }
  };

  return (
    <div className="App">
      <Header />
      <Image
        src={imageSrc}
        onLoaded={analyseImage}
        imageAnimate={imageAnimate}
        goLeft={goLeft}
        goRight={goRight}
        onError={onError}
        isError={isError}
      />
      <Predictions
        predictions={predictions}
        predictionAnimate={predictionAnimate}
      />
      <Upload
        onChange={uploadImage}
        imageSrc={imageSrc}
        getImageFromUrl={getImageFromUrl}
      />
      <Footer />
    </div>
  );
};

export default App;
