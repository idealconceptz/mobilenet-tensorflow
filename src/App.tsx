import { FC, useState } from "react";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "./App.css";
import testImage from "./dog.jpg";
import Heading from "./components/Heading";
import Image from "./components/Image";
import Predictions from "./components/Predictions";
import Upload from "./components/Upload";

interface IResponse {
  className: string;
  probability: number;
}

const App: FC = () => {
  const [predictions, setPredictions] = useState<any>([]);
  const [imageSrc, setImageSrc] = useState(testImage);
  const [imageAnimate, setImageAnimate] = useState(false);

  const uploadImage = (e: any) => {
    setImageAnimate(false);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  const getImageFromUrl = (e: any) => {
    console.log(e.target.value);
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
    const version = 2;
    const alpha = 1;
    const model = await mobilenet.load({ version, alpha });
    const topk = 10;
    const response: any = await model.classify(imageToClassify, topk);
    buildPredictionArray(response);
  };

  return (
    <div className="App">
      <Heading />
      <Image
        src={imageSrc}
        onLoaded={analyseImage}
        imageAnimate={imageAnimate}
      />
      <Predictions predictions={predictions} imageAnimate={imageAnimate} />
      <Upload
        onChange={uploadImage}
        imageSrc={imageSrc}
        getImageFromUrl={getImageFromUrl}
      />
    </div>
  );
};

export default App;
