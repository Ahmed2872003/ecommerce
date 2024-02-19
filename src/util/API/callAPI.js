import CustomQuery from "../CustomQuery";
import axios, { Axios } from "axios";
import AxiosAPIError from "../errors/AxiosAPIError";

export default class CallAPI {
  async get(endpoint, filters) {
    const query = CustomQuery.stringRepOf(filters);

    try {
      const res = await axios.get(axios.BASE_URL + `/${endpoint}?` + query);

      return res.data ? res.data.data : undefined;
    } catch (err) {
      throw AxiosAPIError.format(err);
    }
  }

  async getById(endpoint, id) {
    try {
      const res = await axios.get(axios.BASE_URL + `/${endpoint}/${id}`);

      return res.data.data;
    } catch (err) {
      throw AxiosAPIError.format(err);
    }
  }

  async post(endpoint, data) {
    try {
      const res = await axios.post(axios.BASE_URL + `/${endpoint}`, data);

      return res.data ? res.data.data : undefined;
    } catch (err) {
      throw AxiosAPIError.format(err);
    }
  }

  async patch(endpoint, data) {
    try {
      const res = await axios.patch(axios.BASE_URL + `/${endpoint}`, data);

      return res.data ? res.data.data : undefined;
    } catch (err) {
      throw AxiosAPIError.format(err);
    }
  }

  async updateById(endpoint, id, data) {
    try {
      return await axios.patch(axios.BASE_URL + `/${endpoint}/${id}`, data);
    } catch (err) {
      throw Axios.format(err);
    }
  }

  async deleteById(endpoint, id) {
    try {
      await axios.delete(axios.BASE_URL + `/${endpoint}/${id}`);
    } catch (err) {
      AxiosAPIError.format(err);
    }
  }
}
