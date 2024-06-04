export default class AxiosAPIError extends Error {
  constructor(statusCode = undefined, message = null) {
    super(message);
    this.statusCode = statusCode;
  }

  static format(axiosApiError) {
    let statusCode = undefined;
    let message = null;

    if ("response" in axiosApiError) {
      statusCode = axiosApiError.response.status;
      message = axiosApiError.response.data.msg;
    } else {
      if (axiosApiError.message === "Network Error") message = "Server is down";
    }

    return new AxiosAPIError(statusCode, message);
  }
}
