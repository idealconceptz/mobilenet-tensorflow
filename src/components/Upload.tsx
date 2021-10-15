import { FC } from "react";
import "./Upload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";

const Upload: FC<any> = (props) => {
  const clearInput = (e: any) => {
    props.setImageUrl("");
  };
  return (
    <div className="upload-panel">
      <div className="upload-section">
        <div className="file has-name is-boxed is-info">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="resume"
              id="single"
              accept="image/png, image/jpeg, image/webp"
              onChange={props.onChange}
            />
            <span className="file-cta">
              <span className="file-icon">
                <FontAwesomeIcon icon={faUpload} size="1x" />
                &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCamera} size="1x" />
              </span>
              <span className="file-label">Upload photo or Use Camera</span>
            </span>
            <span className={`file-name input-text`}>{props.imageSrc}</span>
          </label>
        </div>
      </div>
      <div className="upload-section">
        <div className="file has-name is-boxed">
          <label className="file-label">
            <span className="file-cta">
              <span className="file-label">Copy & Paste remote photo URL</span>
            </span>
            <input
              className="input"
              type="text"
              value={props.imageUrl}
              onChange={props.getImageFromUrl}
              onFocus={(e) => clearInput(e)}
              placeholder="Paste an image URL here"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
export default Upload;
