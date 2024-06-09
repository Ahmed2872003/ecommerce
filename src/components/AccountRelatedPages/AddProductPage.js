// Hooks
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// CSS
import "./AddProductPage.css";
import { name } from "@cloudinary/url-gen/actions/namedTransformation";
import { image, text } from "@cloudinary/url-gen/qualifiers/source";
import ImageUploadInput from "../Inputs/ImageUploadInput";

// Modules
import { Image } from "../../util/Image";

const nOfImages = 6;
const textRegExp = /^([a-z]\s?)+[\sa-z0-9.,'’"?!&()\-:;\/]*$/i;

export default function AddProductPage(props) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 10,
      quantity: 1,
      image: null,
      images: null,
    },
  });

  const [base64Imgs, setBase64Imgs] = useState(null);
  const [base64Img, setBase64Img] = useState(null);

  const [txtBoxLen, setTxtBoxLen] = useState(0);

  function handleFormSubmit(data) {
    console.log(data);
  }

  async function handelImgsChange(e) {
    const imgsFiles = Array.from(e.target.files);

    if (!imgsFiles.length) return setBase64Imgs(null);

    const convertToBase64Promises = imgsFiles.map((f) => Image.toBase64(f));

    const base64Imgs = await Promise.all(convertToBase64Promises);

    setBase64Imgs(base64Imgs);
  }

  async function handleImgChange(e) {
    const imgFile = e.target.files[0];

    if (!imgFile) return setBase64Img(null);

    const base64Img = await Image.toBase64(imgFile);

    setBase64Img(base64Img);
  }

  return (
    <>
      <h4 className="title">Create product</h4>
      <div className="container" id="add-product-con">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                Name
              </span>
              <input
                type="text"
                className={`form-control ${errors.name ? "wrong-input" : ""}`}
                {...register("name", {
                  required: "Required",
                  minLength: { value: 5, message: "length should be >= 5" },
                  maxLength: { value: 50, message: "Length should be <= 50" },
                  pattern: {
                    value: textRegExp,
                    message: `1- Should start with an alphapet\n2- Shouldn't contain special characters except ( space . , ' ’ " ? ! & ( ) - : / )`,
                  },
                })}
              />
            </div>
            {errors.name && (
              <div
                className="form-text text-danger fw-bold err-con"
                id="basic-addon4"
              >
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">Description</span>
              <textarea
                className={`form-control ${
                  errors.description ? "wrong-input" : ""
                }`}
                {...register("description", {
                  required: "Required",
                  minLength: { value: 100, message: "length should be >= 100" },
                  maxLength: { value: 500, message: "Length should be <= 500" },
                  pattern: {
                    value: textRegExp,
                    message: `1- Should start with an alphapet\n2- Shouldn't contain special characters except ( space . , ' ’ " ? ! & ( ) - : / )`,
                  },
                  onChange: (e) => setTxtBoxLen(e.target.value.length),
                })}
                maxLength={"500"}
              ></textarea>
            </div>
            <div className="form-text text-end" id="basic err-con-addon4">
              {`${txtBoxLen}/500`}
            </div>
            {errors.description && (
              <div
                className="form-text text-danger fw-bold err-con"
                id="basic-addon4"
              >
                {errors.description.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <div class="input-group">
              <input
                type="number"
                name="price"
                step="1"
                className={`form-control ${errors.price ? "wrong-input" : ""}`}
                {...register("price", {
                  required: "Required",
                  // min: 10,
                  validate: {
                    isInteger: (num) => Number.isInteger(+num),
                    matchMin: (num) => +num >= 10,
                  },
                })}
              />
              <span class="input-group-text">.00 $</span>
            </div>
            {errors.price && (
              <div
                className="form-text text-danger fw-bold err-con"
                id="basic-addon4"
              >
                {errors.price.type === "isInteger"
                  ? "Value must be an integer"
                  : errors.price.type === "matchMin"
                  ? "Value must be >= 10$"
                  : errors.price.message}
              </div>
            )}
          </div>
          <div className="mb-4" style={{ width: "fit-content" }}>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                Quantity
              </span>
              <input
                type="number"
                name="quantity"
                step="1"
                className={`form-control ${
                  errors.quantity ? "wrong-input" : ""
                }`}
                {...register("quantity", {
                  required: "Required",
                  validate: {
                    isInteger: (num) => Number.isInteger(+num),
                    isPositive: (num) => +num >= 0,
                    matchMin: (num) => +num >= 1,
                  },
                })}
              />
            </div>
            {errors.quantity && (
              <div
                className="form-text text-danger fw-bold err-con"
                id="basic-addon4"
              >
                {errors.quantity.type === "isInteger"
                  ? "Value must be an integer"
                  : errors.quantity.type === "isPositive"
                  ? "Value must be positive"
                  : errors.quantity.type === "matchMin"
                  ? "Value must be >= 1"
                  : errors.quantity.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="mb-3">
              <div className="form-text mb-3" id="basic-add err-conon4">
                Main image
              </div>
              <ImageUploadInput
                registerData={register("image", {
                  required: "Required",
                  onChange: handleImgChange,
                })}
              />
              {errors.images && (
                <span className="ms-3  text-danger fw-bold">
                  {errors.images.type === "matchImgsNum"
                    ? `Number of images must be ${nOfImages - 1} images`
                    : errors.images.message}
                </span>
              )}
            </div>
            {base64Img && (
              <div className="img-cover" style={{ width: "fit-content" }}>
                <img src={base64Img} href="" />
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="form-text mb-3" id="basic-add err-conon4">
              Images
            </div>
            <div className="hint">
              <i className="fa-solid fa-circle-exclamation"></i>
              <p>Choose exactly 5 images</p>
            </div>
            <br />
            <div className="mb-3">
              <ImageUploadInput
                multiple={true}
                registerData={register("images", {
                  required: "Required",
                  onChange: handelImgsChange,
                  validate: {
                    matchImgsNum: (val) => val.length === nOfImages - 1,
                  },
                })}
              />
              {errors.images && (
                <span className="ms-3  text-danger fw-bold">
                  {errors.images.type === "matchImgsNum"
                    ? `Number of images must be ${nOfImages - 1} images`
                    : errors.images.message}
                </span>
              )}
            </div>
            {base64Imgs && (
              <div className="row">
                {base64Imgs.map((base64Img) => (
                  <div className="col img-cover">
                    <img src={base64Img} href="" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-warning">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
