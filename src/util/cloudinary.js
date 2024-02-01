import { Cloudinary } from "@cloudinary/url-gen";

export default new Cloudinary({
  cloud: { cloudName: process.env.REACT_APP_CLD_NAME },
});
