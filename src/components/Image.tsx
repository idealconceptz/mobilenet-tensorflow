import { FC } from "react";

const Image: FC<any> = (props) => {
  return (
    <section className="image-container">
      <button onClick={props.goLeft} className={`arrow-button left-button`}>
        <img src="left-arrow.png" alt="left arrow" />
      </button>
      <div className="image-middle">
        <img
          alt="main"
          id="img"
          src={props.src}
          crossOrigin="anonymous"
          onLoad={(e) => {
            props.onLoaded(e.target);
          }}
          className={`main-image ${
            props.imageAnimate ? "image-fadein" : "image-fadeout"
          }`}
        />
      </div>
      <button onClick={props.goRight} className={`arrow-button right-button`}>
        <img src="left-arrow.png" alt="right arrow" />
      </button>
    </section>
  );
};

export default Image;
