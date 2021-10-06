import { FC } from "react";

const Prediction: FC<any> = (props: any) => {
  const prediction = props.prediction;
  return (
    <li key={prediction.rank}>
      {prediction.rank}:&nbsp;{prediction.item}&nbsp;-&nbsp;probability&nbsp;
      {(prediction.probability * 100).toFixed(2)}%
    </li>
  );
};
export default Prediction;
