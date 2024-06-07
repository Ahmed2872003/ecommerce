export class Image {
  static #base64Regex =
    /^data:image\/(?:png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,/;

  static isBase64(src) {
    return this.#base64Regex.test(src);
  }

  static toBase64(file) {
    return new Promise((res, rej) => {
      if (!file) rej("No file selected");

      const reader = new FileReader();

      reader.onloadend = function () {
        const base64String = reader.result; // Remove the "data:image/...;base64," part

        res(base64String);
      };

      reader.onerror = function (err) {
        rej(err);
      };

      reader.readAsDataURL(file);
    });
  }
}
