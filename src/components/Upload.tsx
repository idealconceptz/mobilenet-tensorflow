import { FC } from "react";

const Upload: FC<any> = (props) => {
  console.log(props);
  return (
    <div>
      <div>Upload an image to classify</div>
      <input
        type="file"
        id="single"
        accept="image/png, image/jpeg, image/webp"
        onChange={props.onChange}
      />
    </div>
  );
};
export default Upload;
