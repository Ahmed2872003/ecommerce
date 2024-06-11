// Hooks
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Form, useForm } from "react-hook-form";

// CSS
import "./AddProductPage.css";

import ImageUploadInput from "../Inputs/ImageUploadInput";

// Modules
import { Image } from "../../util/Image";
import { pageContext } from "../../Contexts/Page";
import errorHandler from "../../util/errors/errorHandler";
import { callAPI } from "../../util/API/callAPI";
import { productAPI } from "../../util/API/APIS";
import cloudinary from "../../util/cloudinary";
import { AdvancedImage } from "@cloudinary/react";

const nOfImages = 6;

const textRegExp = /^([a-z]\s?)+[\sa-z0-9.,'’"?!&()\-:;\/]*$/i;

export default function AddProductPage(props) {
  const { state } = useLocation();

  const product = state?.product;

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue: setFormData,
    formState: { errors, defaultValues },
  } = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      quantity: product?.quantity || "",
      CategoryId: product?.CategoryId || undefined,
      BrandId: product?.BrandId || undefined,
      image: null,
      images: [],
    },
  });

  const page = useContext(pageContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [base64Img, setBase64Img] = useState(null);

  const [base64Imgs, setBase64Imgs] = useState(null);

  const [txtBoxLen, setTxtBoxLen] = useState(product?.description.length || 0);

  const [isBrandsLoading, setIsBrandsLoading] = useState(false);

  const categories = useGetCategories(page);

  const brands = useGetBrands(
    getValues("CategoryId"),
    page,
    setIsBrandsLoading
  );

  async function handleImgsChange(e) {
    const isMultipleImgs = e.target.multiple;

    const setBase64 = isMultipleImgs ? setBase64Imgs : setBase64Img;

    const imgsFiles = Array.from(e.target.files);

    if (!imgsFiles.length) return setBase64(null);

    const base64 = await Promise.all(imgsFiles.map((f) => Image.toBase64(f)));

    setBase64(isMultipleImgs ? base64 : base64[0]);
  }

  async function handleFormSubmit(data) {
    [data.image] = await compressFiles(data.image);
    data.images = await compressFiles(data.images);

    const formData = new FormData();

    data.images.forEach((img) => formData.append("images", img));

    delete data.images;

    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    setIsSubmitting(true);

    console.log([...formData]);

    const isError = await errorHandler(async () => {
      product
        ? await productAPI.updateById(product.id, formData)
        : await productAPI.post(formData, {
            "Content-Type": "multipart/form-data",
          });
    }, page.alertMsg.setMsg);

    setIsSubmitting(false);

    if (!isError)
      page.alertMsg.setMsg([
        "success",
        `Product has been ${product ? "updated" : "created"}`,
      ]);
  }

  async function compressFiles(filesList) {
    if (!filesList || !filesList.length) return [null];

    const compressOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      initialQuality: 0.8,
    };

    const filesArr = Array.from(filesList);

    const compressedFiles = await Promise.all(
      filesArr.map((file) => Image.compress(file, compressOptions))
    );

    return compressedFiles;
  }

  const categoriesOptions =
    categories &&
    categories.map((category) => (
      <option value={category.id}>{category.name}</option>
    ));

  const brandsOptions =
    brands &&
    brands.map((brand) => <option value={brand.id}>{brand.name}</option>);

  return (
    <>
      <h4 className="title">{product ? "Update" : "Create"} product</h4>
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
                  maxLength: { value: 100, message: "Length should be <= 100" },
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
            <div className="input-group">
              <input
                type="number"
                name="price"
                step="1"
                className={`form-control ${errors.price ? "wrong-input" : ""}`}
                {...register("price", {
                  required: "Required",
                  validate: {
                    isInteger: (num) => Number.isInteger(+num),
                    matchMin: (num) => +num >= 10,
                  },
                })}
              />
              <span className="input-group-text">.00 $</span>
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
          <div
            className="d-flex flex-column mb-4"
            style={{ width: "fit-content" }}
          >
            <div className="mb-4 w-100">
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
            <div className="mb-4 w-100">
              <div className="input-group">
                <label className="input-group-text" for="inputGroupSelect01">
                  Category
                </label>
                <select
                  disabled={isBrandsLoading}
                  className={`form-select ${
                    errors.CategoryId ? "wrong-input" : ""
                  }`}
                  id="inputGroupSelect01"
                  {...register("CategoryId", {
                    required: "Required",
                    validate: {
                      isSelected: (val) => val !== "Choose...",
                    },
                    onChange: (e) => {
                      setFormData("BrandId", defaultValues.BrandId);
                      setIsBrandsLoading(true);
                      trigger("CategoryId");
                    },
                  })}
                  value={product?.CategoryId}
                >
                  <option selected>Choose...</option>
                  {categoriesOptions}
                </select>
              </div>
              {errors.CategoryId && (
                <div className="form-text text-danger fw-bold err-con">
                  {errors.CategoryId.type === "isSelected"
                    ? "Required"
                    : errors.CategoryId.message}
                </div>
              )}
            </div>
            <div className="w-100">
              <div className="input-group">
                <label className="input-group-text" for="inputGroupSelect01">
                  Brand
                </label>
                <select
                  disabled={isBrandsLoading}
                  className={`form-select ${
                    errors.BrandId ? "wrong-input" : ""
                  }`}
                  id="inputGroupSelect01"
                  {...register("BrandId", {
                    required: "Required",
                    validate: {
                      isSelected: (val) => val !== "Choose...",
                    },
                  })}
                  value={product?.BrandId}
                >
                  <option selected>Choose...</option>
                  {brandsOptions}
                </select>
              </div>
              {errors.BrandId && (
                <div className="form-text text-danger fw-bold err-con">
                  {errors.BrandId.type === "isSelected"
                    ? "Required"
                    : errors.BrandId.message}
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-3">
              <div className="form-text mb-3" id="basic-add err-conon4">
                Main image
              </div>
              <ImageUploadInput
                registerData={register("image", {
                  required: product ? false : "Required",
                  onChange: handleImgsChange,
                })}
              />
              {errors.image && (
                <span className="ms-3  text-danger fw-bold">
                  {errors.image.message}
                </span>
              )}
            </div>
            {(base64Img || product) && (
              <div className="img-cover" style={{ width: "fit-content" }}>
                {base64Img && <img src={base64Img} alt="" loading="lazy" />}
                {product && !base64Img && (
                  <AdvancedImage
                    cldImg={cloudinary.image(product.image)}
                    alt=""
                    loading="lazy"
                  />
                )}
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
                  required: product ? false : "Required",
                  onChange: handleImgsChange,
                  validate: {
                    matchImgsNum: (val) =>
                      val.length ? val.length === nOfImages - 1 : product,
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
            {(base64Imgs || product) && (
              <div className="row" style={{ width: "fit-content" }}>
                {base64Imgs &&
                  base64Imgs.map((base64Img) => (
                    <div className="col img-cover">
                      <img src={base64Img} alt="" loading="lazy" />
                    </div>
                  ))}
                {product &&
                  !base64Imgs &&
                  product.images.map((cldURL) => (
                    <div className="col img-cover">
                      <AdvancedImage
                        cldImg={cloudinary.image(cldURL)}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-warning"
              disabled={isSubmitting}
            >
              {product ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function useGetCategories(page) {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    page.loading.setLoading(true);
    errorHandler(async () => {
      const categories = await callAPI.get("category");

      page.loading.setLoading(false);
      setCategories(categories);
    }, page.alertMsg.setMsg);
  }, []);

  return categories;
}

function useGetBrands(categoryId, page, setIsBrandsLoading) {
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    errorHandler(async () => {
      if (!Number.isInteger(+categoryId)) return;

      const brands = await callAPI.get("category/brands", null, { categoryId });

      setBrands(brands);
    }, page.alertMsg.setMsg).finally(() => setIsBrandsLoading(false));
  }, [categoryId]);

  return brands;
}
