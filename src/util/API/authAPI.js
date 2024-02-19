import CallAPI from "./callAPI";

class AuthAPI extends CallAPI {
  #endpointFirst = "auth";

  async logout() {
    return await super.get(this.#endpointFirst + "/logout", null);
  }

  async login(data) {
    return await super.post(`${this.#endpointFirst}/login`, data);
  }

  async signup(data) {
    return await super.post(`${this.#endpointFirst}/signup`, data);
  }

  async resetPassword(data, token) {
    return await super.post(
      `${this.#endpointFirst}/reset/password/${token}`,
      data
    );
  }

  async confirmEmail(data, token) {
    return await super.post(
      `${this.#endpointFirst}/confirm/email/${token}`,
      data
    );
  }
}

const authAPI = new AuthAPI();

export default authAPI;
