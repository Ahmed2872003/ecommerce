import Cookies from "js-cookie";

export default function getCurrentCustomerData() {
  const encodedData = Cookies.get("user");

  if (encodedData) return JSON.parse(encodedData);

  return undefined;
}
