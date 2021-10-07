import { FC } from "react";

const Upload: FC<any> = (props) => {
  return (
    <div className="upload-panel">
      <h2>Upload an image from your computer to classify</h2>
      <input
        type="file"
        id="single"
        accept="image/png, image/jpeg, image/webp"
        onChange={props.onChange}
      />
      <h2>or Copy and paste a remote image URL here</h2>
      <input
        type="text"
        value={props.imageSrc}
        onChange={props.getImageFromUrl}
      />
    </div>
  );
};
export default Upload;
