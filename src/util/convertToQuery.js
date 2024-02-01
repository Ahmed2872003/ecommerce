import axios from "axios";

export default function convertToQuery(filters) {
  let query = "";

  const toQueryOp = {
    eq: "=",
    ne: "!=",
    gt: ">",
    gte: ">=",
    lt: "<",
    lte: "<=",
    like: "like=",
    nLike: "nlike=",
  };

  for (const key in filters) {
    for (const Op in filters[key]) {
      if (!filters[key][Op]) continue;
      query += key + toQueryOp[Op] + filters[key][Op] + "&";
    }
  }

  if (query) query = query.slice(0, query.length - 1);

  return query;
}
