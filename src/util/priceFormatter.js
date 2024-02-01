export default function priceFormatter(price) {
  return (Number(price) * 1.0).toFixed(2).split(".");
}
