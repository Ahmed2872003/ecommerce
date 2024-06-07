import { AdvancedImage } from "@cloudinary/react";
import cloudinary from "../../util/cloudinary";

import { Image } from "../../util/Image";

import "./ImageUploadInput.css";
import { useEffect, useState } from "react";

export default function ImageUploadInput({
  file,
  ind,
  formData,
  setFormData,
  setFormErrorMsgs,
}) {
  const [base64Img, setBase64Img] = useState("");

  useEffect(() => {
    if (file) {
      Image.toBase64(file).then((base64Image) => setBase64Img(base64Image));
    }
  }, [file]);

  async function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prevFormData) => {
      const newImagesFiles = new Array(...prevFormData.images);

      newImagesFiles[+ind] = file;

      if (!newImagesFiles.slice(1).some((file) => file === undefined))
        setFormErrorMsgs((errMsgs) => ({
          ...errMsgs,
          images: "",
        }));

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

      return {
        ...prevFormData,
        images: newImagesFiles,
      };
    });
  }

  return (
    <div className="upload-img-con">
      {!file ? (
        <div className="input-sec">
          <label
            className="file-input-label p-2 btn btn-light"
            htmlFor={`image-${ind}`}
          >
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
