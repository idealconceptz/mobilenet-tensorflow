import { FC } from "react";

const Image: FC<any> = (props) => {
  return (
    <div>
      <img id="img" src={props.src} className="main-image" alt="logo" />
    </div>
  );
};
export default Image;
