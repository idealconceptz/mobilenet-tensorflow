import { FC, useEffect, useState } from "react";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "./App.css";
import testImage from "./car.jpg";
import Heading from "./components/Heading";
import Image from "./components/Image";
import Predictions from "./components/Predictions";
import Upload from "./components/Upload";

interface Response {
  className: string;
  probability: number;
}
enum Actions {
  Analyse,
  Done,
}

const App: FC = () => {
  const [predictions, setPredictions] = useState<any>([]);
  const [imageSrc, setImageSrc] = useState(testImage);
  const [action, setAction] = useState(Actions.Analyse);

  const uploadImage = (e: any) => {
    setAction(Actions.Analyse);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  const buildPredictionArray = (obj: Response) => {
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

  const analyseImage = async () => {
    setAction(Actions.Done);
    const imageToClassify = document.getElementById("img") as HTMLImageElement;

    const version = 2;
    const alpha = 0.5;
    const model = await mobilenet.load({ version, alpha });
    const response: any = await model.classify(imageToClassify);
    buildPredictionArray(response);

    // Get the logits.
    const logits = model.infer(imageToClassify);
    console.log("Logits");
    logits.print(true);

    // Get the embedding.
    const embedding = model.infer(imageToClassify, true);
    console.log("Embedding");
    embedding.print(true);
  };

  useEffect(() => {
    if (action === Actions.Analyse) {
      analyseImage();
    }
  });

  return (
    <div className="App">
      <Heading />
      <Image src={imageSrc} />
      <Upload onChange={uploadImage} />
      <Predictions predictions={predictions} />
    </div>
  );
};

export default App;
