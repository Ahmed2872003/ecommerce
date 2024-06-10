import imageCompression from "browser-image-compression";

export class Image {
  static #base64Regex =
    /^data:image\/(?:png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,/;

  static isBase64(src) {
    return this.#base64Regex.test(src);
  }

  static toBase64(file, events) {
    return new Promise((res, rej) => {
      if (!file) rej("No file selected");

      const reader = new FileReader();

      for (const event in events) reader[event] = events[event];

      reader.onloadend = function () {
        const base64String = reader.result;

        res(base64String);
      };

      reader.onerror = function (err) {
        rej(err);
      };

      reader.readAsDataURL(file);
    });
  }

  static async compress(file, options) {
    const compressedFileBlob = await imageCompression(file, options);

    const compressedFile = new File([compressedFileBlob], file.name, {
      type: file.type,
    });

    return compressedFile;
  }
}
