import axios from "axios";

export default class CustomQuery {
  static get objKeys() {
    return {
      eq: "=",
      ne: "!=",
      gt: ">",
      gte: ">=",
      lt: "<",
      lte: "<=",
      like: "like=",
      nLike: "nlike=",
    };
  }

  static get strKeys() {
    return {
      "=": "eq",
      "!=": "ne",
      ">": "gt",
      ">=": "gte",
      "<": "lt",
      "<=": "lte",
      "like=": "like",
      "nlike=": "nLike",
    };
  }

  static stringRepOf(queryObj) {
    let res = "";

    for (const key in queryObj) {
      for (const Op in queryObj[key]) {
        if (!queryObj[key][Op]) continue;
        res += key + this.objKeys[Op] + queryObj[key][Op] + "&";
      }
    }

    return res.slice(0, -1);
  }

  static objectRepOf(queryString = "") {
    const res = {};

    const filterRegExp = /(like|nlike)*=|!=|(>|<)=*/g;

    queryString = queryString.replaceAll(/%3E|%3C/g, (match) =>
      match === "%3E" ? ">" : "<"
    );

    queryString = queryString
      .replaceAll(filterRegExp, (match) => " " + match + " ")
      .split("&");

    queryString.forEach((element) => {
      let [key, op, val] = element.split(" ");

      res[key] = { [this.strKeys[op]]: val };
    });

    return queryString.join("").length ? res : {};
  }
}
