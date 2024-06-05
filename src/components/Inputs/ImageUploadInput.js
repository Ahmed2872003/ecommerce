import { AdvancedImage } from "@cloudinary/react";
import cloudinary from "../../util/cloudinary";

import { File } from "../../util/Image";

import "./ImageUploadInput.css";

export default function ImageUploadInput({ src }) {
  const isLocalFile = File.isLocalFile(src);

  console.log(isLocalFile);

  return isLocalFile ? (
    <img src={src} alt="" />
  ) : (
    <AdvancedImage cldImg={cloudinary.image(src)} />
  );
}
