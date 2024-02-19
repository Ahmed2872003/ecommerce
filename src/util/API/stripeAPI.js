import CallAPI from "./callAPI";

class StripeAPI extends CallAPI {
  #endpointFirst = "stripe";

  async createCheckoutSession(data) {
    return super.post(`${this.#endpointFirst}/create-checkout-session`, data);
  }
}

const stripeAPI = new StripeAPI();

export default stripeAPI;
