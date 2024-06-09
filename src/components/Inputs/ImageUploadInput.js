import { AdvancedImage } from "@cloudinary/react";
import cloudinary from "../../util/cloudinary";

import { Image } from "../../util/Image";

import "./ImageUploadInput.css";
import { useEffect, useState } from "react";
import { render } from "@testing-library/react";

export default function ImageUploadInput({ registerData, multiple = false }) {
  return (
    <>
      <label
        htmlFor={`${registerData.name}-upload-input`}
        className="btn btn-light"
      >
        Choose
      </label>
      <input
        className="d-none"
        id={`${registerData.name}-upload-input`}
        type="file"
        multiple={multiple}
        accept="image/png, image/jpeg"
        {...registerData}
      />
    </>
  );
}
