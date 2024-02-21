import CustomQuery from "../CustomQuery";
import { axiosAPI } from "../../util/axios";
import AxiosAPIError from "../errors/AxiosAPIError";

export default class CallAPI {
  async get(endpoint, filters) {
    const query = CustomQuery.stringRepOf(filters);

    try {
      const res = await axiosAPI.get(`/${endpoint}?` + query);

      return res.data ? res.data.data : undefined;
    } catch (err) {
      throw AxiosAPIError.format(err);
    }
  }

  async getById(endpoint, id) {
    try {
      const res = await axiosAPI.get(`/${endpoint}/${id}`);

      return res.data.data;
    } catch (err) {
      throw AxiosAPIError.format(err);
    }
  }

  async post(endpoint, data) {
    try {
      const res = await axiosAPI.post(`/${endpoint}`, data);

      return res.data ? res.data.data : undefined;
    } catch (err) {
      throw AxiosAPIError.format(err);
    }
  }

  async patch(endpoint, data) {
    try {
      const res = await axiosAPI.patch(`/${endpoint}`, data);

      return res.data ? res.data.data : undefined;
    } catch (err) {
      throw AxiosAPIError.format(err);
    }
  }

  async updateById(endpoint, id, data) {
    try {
      return await axiosAPI.patch(`/${endpoint}/${id}`, data);
    } catch (err) {
      throw AxiosAPIError.format(err);
    }
  }

  async deleteById(endpoint, id) {
    try {
      await axiosAPI.delete(`/${endpoint}/${id}`);
    } catch (err) {
      AxiosAPIError.format(err);
    }
  }
}
