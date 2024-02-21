export default function getCurrentCustomerData() {
  const encodedData = JSON.parse(localStorage.getItem("customer"));

  return encodedData;
}
