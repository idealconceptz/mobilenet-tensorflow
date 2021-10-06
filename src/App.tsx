import React, { useEffect, useState } from "react";
import testImage from "./car.jpg";
import "./App.css";

//import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as mobilenet from "@tensorflow-models/mobilenet";

const App: React.FC = () => {
  const [predictions, setPredictions] = useState<any>([]);
  const [myimage, setMyimage] = useState({ src: testImage });
  const [action, setAction] = useState("predict");

  const Image = () => {
    return <img id="img" src={myimage.src} className="main-image" alt="logo" />;
  };

  function Predictions(pd: any) {
    console.log("P", predictions);
    return (
      <div>
        <p>dsd</p>
        {predictions.length}
        <ul>
          {predictions.length > 0 &&
            predictions.map((value: any, key: any) => {
              return (
                <li key={key}>
                  {key}
                  {value.item}
                  {value.probability}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
  function validateResponse(response: any) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  const loadImage = (e: any) => {
    console.log(e.target.files[0].name);
    console.log(e.target.files);
    //  const file = e.target.files[0].name;
    // const img = document.getElementById("img") as HTMLImageElement;

    setAction("predict");
    setMyimage({ src: URL.createObjectURL(e.target.files[0]) });
    //  test());
  };

  const test = async () => {
    const img = document.getElementById("img") as HTMLImageElement;

    console.log("run");
    console.log(img);
    const version = 2;
    const alpha = 0.5;
    const model = await mobilenet.load({ version, alpha });

    console.log(testImage);

    // Classify the image.
    const predictions2 = await model.classify(img);
    const predictions3 = [];
    for (const [key, value] of Object.entries(predictions2)) {
      console.log(`${key}: ${value.probability}`);
      predictions3.push({
        rank: key,
        item: value.className,
        probability: value.probability,
      });
    }
    console.log("predictions3", predictions3);
    setPredictions(predictions3);
    console.log("Predictions2");
    console.log(typeof predictions2);
    console.log(predictions2);

    // Get the logits.
    const logits = model.infer(img);
    console.log("Logits");
    logits.print(true);

    // Get the embedding.
    const embedding = model.infer(img, true);
    console.log("Embedding");
    embedding.print(true);
    setAction("image");
  };
  useEffect(() => {
    // Update the document title using the browser API
    // if (predictions && Object.keys(predictions).length === 0) {
    console.log("ssas", action, predictions);
    //  if (predictions.length === 0) {
    if (action === "predict") {
      test();
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" id="single" onChange={loadImage} />
        <Image />

        <Predictions predictions={predictions} />
      </header>
    </div>
  );
};

export default App;
