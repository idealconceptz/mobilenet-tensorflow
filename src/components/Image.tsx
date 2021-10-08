import { FC } from "react";

const Image: FC<any> = (props) => {
  // We could handle loading errors within this component, but for flexibility as to where we put the error notification, we push it back to the main app
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
          onError={(e: any) => {
            props.onError(e);
          }}
          className={`main-image ${
            props.imageAnimate ? "image-fadein" : "image-fadeout"
          }`}
        />
        <div className="error-panel">
          <p className={`${props.isError ? "show-error" : "hide-error"}`}>
            Error: This image cannot be acquired - please try another.
          </p>
          <p className={`${props.isError ? "show-error" : "hide-error"}`}>
            {props.src}
          </p>
        </div>
      </div>
      <button onClick={props.goRight} className={`arrow-button right-button`}>
        <img src="left-arrow.png" alt="right arrow" />
      </button>
    </section>
  );
};

export default Image;
