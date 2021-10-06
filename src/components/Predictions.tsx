import { FC } from "react";
import Prediction from "../components/Prediction";

const Predictions: FC<any> = (props) => {
  const predictions = props.predictions;
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
};
export default Predictions;
