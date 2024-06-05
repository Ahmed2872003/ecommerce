// Modules
import { useState } from "react";

// CSS
import "./AddProductPage.css";
import { name } from "@cloudinary/url-gen/actions/namedTransformation";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import ImageUploadInput from "../Inputs/ImageUploadInput";

export default function AddProductPage(props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 10,
    quantity: 1,
    image: "",
    images: "",
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

  return (
    <>
      <h4 className="title">Create product</h4>
      <div className="container" id="add-product-con">
        <form>
          <div className="mb-3">
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
                aria-label="Name"
                aria-describedby="basic-addon1"
              />
            </div>
            {formErrorMsgs.name && (
              <div className="form-text text-danger" id="basic-addon4">
                {formErrorMsgs.name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">Description</span>
              <textarea
                value={formData.description}
                name="description"
                onChange={handleFormDataChange}
                className={`form-control ${
                  formErrorMsgs.description ? "wrong-input" : ""
                }`}
                aria-label="With textarea"
                minLength={5}
                maxLength={500}
              ></textarea>
            </div>
            <div className="form-text text-end" id="basic-addon4">
              {`${txtBoxLen}/500`}
            </div>
            {formErrorMsgs.description && (
              <div className="form-text text-danger" id="basic-addon4">
                {formErrorMsgs.description}
              </div>
            )}
          </div>
          <div className="mb-3">
            <div class="input-group">
              <input
                type="number"
                name="price"
                value={formData.price}
                min={10}
                step={1}
                onChange={handleFormDataChange}
                className={`form-control ${
                  formErrorMsgs.price ? "wrong-input" : ""
                }`}
                aria-label="Amount (to the nearest dollar)"
              />
              <span class="input-group-text">.00 $</span>
            </div>
            {formErrorMsgs.price && (
              <div className="form-text text-danger" id="basic-addon4">
                {formErrorMsgs.price}
              </div>
            )}
          </div>
          <div className="mb-3" style={{ width: "fit-content" }}>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                Quantity
              </span>
              <input
                type="number"
                value={formData.quantity}
                name="quantity"
                min={1}
                step={1}
                onChange={handleFormDataChange}
                className={`form-control ${
                  formErrorMsgs.quantity ? "wrong-input" : ""
                }`}
                aria-label="Quantity"
                aria-describedby="basic-addon1"
              />
            </div>
            {formErrorMsgs.quantity && (
              <div className="form-text text-danger" id="basic-addon4">
                {formErrorMsgs.quantity}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-warning float-end">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
