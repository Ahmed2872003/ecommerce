import { AdvancedImage } from "@cloudinary/react";
import cloudinary from "../../util/cloudinary";

import { Image } from "../../util/Image";

import "./ImageUploadInput.css";
import { useEffect, useState } from "react";

export default function ImageUploadInput({ file, ind, setFormData, formData }) {
  const [base64Img, setBase64Img] = useState("");

  async function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const base64Image = await Image.toBase64(file);

    setBase64Img(base64Image);

    setFormData((prevFormData) => {
      const newImagesFiles = new Array(...prevFormData.images);

      newImagesFiles[+ind] = file;

      console.log(newImagesFiles);

      return {
        ...prevFormData,
        images: newImagesFiles,
      };
    });
  }

  function handleUnchooseImage(e) {
    setBase64Img("");

    setFormData((prevFormData) => {
      const newImagesFiles = new Array(...prevFormData.images);

      newImagesFiles[+ind] = undefined;

      console.log(newImagesFiles);

      return {
        ...prevFormData,
        images: newImagesFiles,
      };
    });
  }

  // console.log(formData);

  return (
    <div className="upload-img-con">
      {!file ? (
        <div className="input-sec">
          <label className="file-input-label p-2" htmlFor={`image-${ind}`}>
            <span>
              <i class="fa-solid fa-upload"></i>
            </span>
            <span>Choose Image</span>
          </label>
          <input
            id={`image-${ind}`}
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
        </div>
      ) : (
        <div className="img-sec">
          <div className="img-cover">
            <i class="fa-solid fa-xmark" onClick={handleUnchooseImage}></i>
            <img src={base64Img} className="img-fluid" alt="" />
          </div>
          <span className="image-name d-block text-center">{file.name}</span>
        </div>
      )}
    </div>
  );
}
