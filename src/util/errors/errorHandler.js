import AxiosAPIError from "./AxiosAPIError";

export default async function errorHandler(cb, showMsg) {
  try {
    if (cb) await cb();
  } catch (err) {
    if (err instanceof AxiosAPIError) showMsg(["error", err.message]);
    else console.log(err);

    return true;
  }

  return false;
}
