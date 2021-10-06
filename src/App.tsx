import React, { useEffect, useState } from "react";
import testImage from "./car.jpg";
import "./App.css";

import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as mobilenet from "@tensorflow-models/mobilenet";

interface Response {
  className: string;
  probability: number;
}
enum Actions {
  Analyse = "analyse",
  Done = "done",
}

const App: React.FC = () => {
  const [predictions, setPredictions] = useState<any>([]);
  const [myimage, setMyimage] = useState({ src: testImage });
  const [action, setAction] = useState(Actions.Analyse);

  const Image = () => {
    return (
      <div>
        <img id="img" src={myimage.src} className="main-image" alt="logo" />
      </div>
    );
  };

  function Prediction(props: any) {
    const prediction = props.prediction;
    return (
      <li key={prediction.rank}>
        {prediction.rank}: {prediction.item}
        {(prediction.probability * 100).toFixed(2)}%
      </li>
    );
  }

  function Predictions() {
    return (
      <div>
        <h2>I think this is likely to be...</h2>
        <ul className="predictions">
          {predictions.length > 0 &&
            predictions.map((prediction: any, key: any) => {
              return <Prediction key={key} prediction={prediction} />;
            })}
        </ul>
      </div>
    );
  }

  const uploadImage = (e: any) => {
    setAction(Actions.Analyse);
    setMyimage({ src: URL.createObjectURL(e.target.files[0]) });
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
    console.log("array", array);
    setPredictions(array);
  };

  const analyseImage = async () => {
    setAction(Actions.Done);
    const imageToClassify = document.getElementById("img") as HTMLImageElement;

    const version = 2;
    const alpha = 0.5;
    const model = await mobilenet.load({ version, alpha });

    console.log(testImage);

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
    if (action === "analyse") {
      analyseImage();
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>TensorFlow Image Classification Demo using Mobilenet</h1>
      </header>

      <Image />
      <div>
        <div>Upload an image to classify</div>
        <input
          type="file"
          id="single"
          accept="image/png, image/jpeg, image/webp"
          onChange={uploadImage}
        />
      </div>
      <Predictions />
    </div>
  );
};

export default App;
