import axios from "axios";

const REACT_APP_BACKEND_API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT;

const API_BASE_URL = `${REACT_APP_BACKEND_API_ENDPOINT}/api/staff`;
const API_BASE_URL_2 = `${REACT_APP_BACKEND_API_ENDPOINT}/api/general/product`;

class ProductService {
  async createProduct(formData) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.post(`${API_BASE_URL}/product/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createMealkit(formData) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("No JWT token found. Please login.");
      }

      const response = await axios.post(`${API_BASE_URL}/mealkit/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchProducts(page, size, type = null, searchQuery = null) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const url = new URL(`${API_BASE_URL_2}/fetch_all`);
      url.searchParams.append("index", page - 1);
      url.searchParams.append("size", size);

      // Chỉ thêm type nếu khác 'ALL' và có giá trị
      if (type && type !== "ALL") {
        url.searchParams.append("type", type);
      }

      if (searchQuery) {
        url.searchParams.append("prod_name", searchQuery);
      }

      const response = await axios.get(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return { content: [], total_page: 1 };
    }
  }

  async allMealkit(page, size) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.get(
        `${REACT_APP_BACKEND_API_ENDPOINT}/api/general/product/fetch_all?type=MK&index=${
          page - 1
        }&size=${size}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getProductDetail(prod_id) {
    try {
      const response = await axios.get(`${API_BASE_URL_2}/fetch`, {
        params: {
          prod_id: prod_id,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProductInfo(prod_id, data) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.post(
        `${API_BASE_URL}/product/update/info/prod?prod_id=${prod_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateMealkitInfo(prod_id, data) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.post(
        `${REACT_APP_BACKEND_API_ENDPOINT}/api/staff/product/update/info/mealkit?prod_id=${prod_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProductStatus(prod_id, status) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.patch(`${API_BASE_URL}/product/update/status`, null, {
        params: {
          prod_id: prod_id,
          status: status,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(prod_id, quantity, in_price) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.patch(`${API_BASE_URL}/product/update/quantity`, null, {
        params: {
          prod_id: prod_id,
          quantity: quantity,
          in_price: in_price,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProductPrice(product_id, price, sale_percent) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.put(
        `${API_BASE_URL}/product/update/price`,
        null, // Không gửi body
        {
          params: {
            product_id: product_id,
            price: price,
            sale_percent: sale_percent,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getHistoryProduct(prod_id, index, size) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.get(
        `${API_BASE_URL}/product/history/stock?prod_id=${prod_id}&index=${index - 1}&size=${size}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getHistoryUpdate(prod_id, index, size) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.get(
        `${API_BASE_URL}/product/history/price?prod_id=${prod_id}&index=${index - 1}&size=${size}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async searchProducts(query, page) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.get(`${API_BASE_URL}/mealkit/create/fetch/ingredients`, {
        params: {
          search: query,
          index: page,
          size: 7,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return { content: [], total_page: 1 };
    }
  }

  async getIngredient(query, page, size) {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.get(`${API_BASE_URL_2}/fetch/ingredients`, {
        params: {
          prod_id: query,
          index: page - 1,
          size: size,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return {
        content: [],
        total_element: 0,
        total_page: 1,
        page_index: 0,
      };
    }
  }
}

export default new ProductService();
