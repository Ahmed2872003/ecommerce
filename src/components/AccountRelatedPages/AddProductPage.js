// Modules
import { useState } from "react";

// CSS
import "./AddProductPage.css";
import { name } from "@cloudinary/url-gen/actions/namedTransformation";
import { image, text } from "@cloudinary/url-gen/qualifiers/source";
import ImageUploadInput from "../Inputs/ImageUploadInput";

const nOfImages = 6;

export default function AddProductPage(props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 10,
    quantity: 1,
    images: new Array(nOfImages).fill(undefined),
  });

  const [formErrorMsgs, setFormErrorMsgs] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    images: "",
  });

  const [txtBoxLen, setTxtBoxLen] = useState(0);

  function handleFormDataChange(e) {
    let { name, value } = e.target;

    if ((name === "price" || name === "quantity") && !Number.isInteger(+value))
      value = Math.floor(value);

    if (name === "description") setTxtBoxLen(value.length);

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateData()) return;

    console.log("Pass");
  }

  function validateData() {
    let isValide = true;

    for (const fieldName in formData) {
      if (fieldName === "images") {
        if (isEmpty(["image", formData[fieldName][0]])) isValide = false;
        if (isEmpty(["images", formData[fieldName].slice(1)])) isValide = false;
      } else if (isEmpty([fieldName, formData[fieldName]])) isValide = false;
    }

    return isValide;

    function isEmpty([field, val]) {
      let emptyExist = false;

      if (field === "image" && val) emptyExist = false;
      else if (!val || (typeof val === "object" && val.some((f) => !f)))
        emptyExist = true;

      setFormErrorMsgs((preVal) => ({
        ...preVal,
        [field]: emptyExist ? "Required" : "",
      }));

      return emptyExist;
    }
  }

  function handleMultiImagesChoose(e) {
    const imagesFiles = e.target.files;

    if (!imagesFiles.length) return;

    if (imagesFiles.length !== 5) {
      setFormErrorMsgs((errMsgs) => ({
        ...errMsgs,
        images: "Please choose exactly 5 images",
      }));
      return;
    }
    setFormErrorMsgs((errMsgs) => ({
      ...errMsgs,
      images: "",
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [prevFormData.images[0], ...imagesFiles],
    }));
  }

  const uploadImgElements = new Array(nOfImages - 1)
    .fill(null)
    .map((val, ind) => (
      <div className="col-12 col-sm-5 col-md d-flex justify-content-center">
        <ImageUploadInput
          file={formData.images[ind + 1]}
          ind={ind + 1}
          setFormData={setFormData}
          setFormErrorMsgs={setFormErrorMsgs}
          formData={formData}
        />
      </div>
    ));

  return (
    <>
      <h4 className="title">Create product</h4>
      <div className="container" id="add-product-con">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                Name
              </span>
              <input
                type="text"
                value={formData.name}
                onChange={handleFormDataChange}
                name="name"
                className={`form-control ${
                  formErrorMsgs.name ? "wrong-input" : ""
                }`}
              />
            </div>
            {formErrorMsgs.name && (
              <div className="form-text text-danger fw-bold" id="basic-addon4">
                {formErrorMsgs.name}
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">Description</span>
              <textarea
                value={formData.description}
                name="description"
                onChange={handleFormDataChange}
                className={`form-control ${
                  formErrorMsgs.description ? "wrong-input" : ""
                }`}
                minLength="5"
                maxLength="500"
              ></textarea>
            </div>
            <div className="form-text text-end" id="basic-addon4">
              {`${txtBoxLen}/500`}
            </div>
            {formErrorMsgs.description && (
              <div className="form-text text-danger fw-bold" id="basic-addon4">
                {formErrorMsgs.description}
              </div>
            )}
          </div>
          <div className="mb-4">
            <div class="input-group">
              <input
                type="number"
                name="price"
                value={formData.price}
                step="1"
                onChange={handleFormDataChange}
                className={`form-control ${
                  formErrorMsgs.price ? "wrong-input" : ""
                }`}
              />
              <span class="input-group-text">.00 $</span>
            </div>
            {formErrorMsgs.price && (
              <div className="form-text text-danger fw-bold" id="basic-addon4">
                {formErrorMsgs.price}
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
                value={formData.quantity}
                name="quantity"
                step="1"
                onChange={handleFormDataChange}
                className={`form-control ${
                  formErrorMsgs.quantity ? "wrong-input" : ""
                }`}
              />
            </div>
            {formErrorMsgs.quantity && (
              <div className="form-text text-danger fw-bold" id="basic-addon4">
                {formErrorMsgs.quantity}
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="form-text mb-3" id="basic-addon4">
              Main image
            </div>
            <div className="col d-flex align-items-center">
              <ImageUploadInput
                file={formData.images[0]}
                ind="0"
                setFormData={setFormData}
                setFormErrorMsgs={setFormErrorMsgs}
                formData={formData}
              />
              {formErrorMsgs.image && (
                <span className="text-danger ms-3 fw-bold">
                  {formErrorMsgs.image}
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="form-text mb-3" id="basic-addon4">
              Images
            </div>
            <div className="mb-3">
              <label htmlFor="images-upload-input" className="btn btn-light">
                Upload images
              </label>
              {formErrorMsgs.images && (
                <span className="ms-3  text-danger fw-bold">
                  {formErrorMsgs.images}
                </span>
              )}
              <input
                className="d-none"
                id={`images-upload-input`}
                type="file"
                name="images"
                multiple
                accept="image/png, image/jpeg"
                onChange={handleMultiImagesChoose}
              />
            </div>
            <div className="d-flex gap-5 row">{uploadImgElements}</div>
            <br />
            <div className="hint">
              <i className="fa-solid fa-circle-exclamation"></i>
              <p>You can click on the image to delete it</p>
            </div>
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
