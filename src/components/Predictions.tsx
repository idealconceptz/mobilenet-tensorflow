import { FC } from "react";
import Prediction from "../components/Prediction";

const Predictions: FC<any> = (props) => {
  const predictions = props.predictions;
  return (
    <div className={`predictions-panel`}>
      <h2>I think this is likely to be...</h2>
      <ol className="predictions">
        {predictions.length > 0 &&
          predictions.map((prediction: any, key: any) => {
            return (
              <Prediction
                key={key}
                prediction={prediction}
                imageAnimate={props.imageAnimate}
              />
            );
          })}
      </ol>
    </div>
  );
};
export default Predictions;
