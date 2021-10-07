import { FC } from "react";

const Image: FC<any> = (props) => {
  return (
    <div>
      <img
        id="img"
        src={props.src}
        crossOrigin="anonymous"
        onLoad={(e) => {
          props.onLoaded(e.target);
        }}
        className={`main-image ${
          props.imageAnimate ? "image-fadein" : "image-fadeout"
        }`}
        alt="logo"
      />
    </div>
  );
};

export default Image;
