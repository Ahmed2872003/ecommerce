import CallAPI from "./callAPI";

class OrderAPI extends CallAPI {
  #endpointFirst = "order";

  async get() {
    return await super.get(this.#endpointFirst, null);
  }
}

const orderAPI = new OrderAPI();

export default orderAPI;
