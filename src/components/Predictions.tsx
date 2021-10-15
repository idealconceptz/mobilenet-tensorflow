import { FC } from "react";
import Prediction from "../components/Prediction";
import "./Predictions.css";

const Predictions: FC<any> = (props) => {
  const predictions = props.predictions;
  return (
    <section className="section predictions-section">
      <div className="container">
        <div className={`predictions-panel`}>
          <div
            className={` ${
              props.predictionAnimate ? "loader-hidden" : "loader"
            }`}
          ></div>
          <h2 className="title">I think this is likely to be...</h2>
          <ol className="predictions">
            {predictions.length > 0 &&
              predictions.map((prediction: any, key: any) => {
                return (
                  <Prediction
                    key={key}
                    prediction={prediction}
                    predictionAnimate={props.predictionAnimate}
                  />
                );
              })}
          </ol>
        </div>
      </div>
    </section>
  );
};
export default Predictions;
