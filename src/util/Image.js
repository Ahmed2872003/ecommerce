export class File {
  static #localFileRegex = /^(\/|[a-zA-Z]:\\)/;

  static isLocalFile(src) {
    return this.#localFileRegex.test(src);
  }
}
