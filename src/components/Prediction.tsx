import { FC } from "react";

const Prediction: FC<any> = (props: any) => {
  const prediction = props.prediction;
  return (
    <li
      key={prediction.rank}
      className={`prediction ${props.imageAnimate ? "prediction-fadein" : ""}`}
    >
      <span>{prediction.item}</span>&nbsp;-&nbsp;<i>probability</i>
      &nbsp;
      <strong>{prediction.probability.toFixed(4)}</strong>
    </li>
  );
};
export default Prediction;
