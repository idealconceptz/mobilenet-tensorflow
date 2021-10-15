import { FC } from "react";
import "./Image.css";

const Image: FC<any> = (props) => {
  // We could handle image display errors within this component, but we pass it up
  // to thhe parent so that all child components can be aware

  return (
    <section className="section image-section">
      <div className="container">
        <div className="image-middle">
          <button onClick={props.goLeft} className="button is-info">
            Previous Sample
          </button>
          &nbsp;
          <button onClick={props.goRight} className="button is-info">
            Next Sample
          </button>
          {(!props.isError && props.src.length > 1 && (
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
          )) || (
            <div className="error-panel">
              <p className={`${props.isError ? "show-error" : "hide-error"}`}>
                Error: This image cannot be acquired - please try another.
              </p>
              <p className={`${props.isError ? "show-error" : "hide-error"}`}>
                {props.src}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Image;
