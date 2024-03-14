import { client } from "../services/axiosClient";
import { ACCESS_TOKEN } from "../constants";


class APIServices {
  
  async get(entityName, id = '') {
    try {
      const response = await client.get(`${entityName}/${id}`);
      return await response.data;
    } catch (error) {
      console.error(`Error fetching ${entityName} data: ${error}`);
      throw error;
    }
  }

  async post(entityName, json) {
    try {
      const response = await client.post(`${entityName}/`, json);
      return await response.data;
    } catch (error) {
      console.error(`Error posting data to ${entityName}: ${error}`);
      throw error;
    }
  }

  async put(entityName, json, id) {
    try {
      const response = await client.put(`${entityName}/${id}`, json);
      return await response.data;
    } catch (error) {
      console.error(`Error updating data in ${entityName}: ${error}`);
      throw error;
    }
  }

  async getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
    try {
      const response = await client.get("user_auth/me");
      return await response.data;
    } catch (error) {
      console.error(`Error fetching user data: ${error}`);
      throw error;
    }
  }

  async login(loginRequest) {
    try {

      const response = await client.post("auth/signin", loginRequest, { authorization: false });
      return await response.data;
    } catch (error) {
      console.error(`Error logging in: ${error}`);
      throw error;
    }
  }
  
  async removeCurrentUser() {
    await localStorage.removeItem(ACCESS_TOKEN);
    return null;
  }
  
  async getEmployeeByUserId(userId) {
    try {
      const response = await client.get(`employee/get-emp-by-user/${userId}`);      
      return await response.data;
    } catch (error) {
      console.error(`Error fetching employee data by user ID: ${error}`);
      throw error;
    }
  }

  async getApproveOwnCertsByManagerId(managerId) {
    try {
      const response = await client.get(`own-cert/approve-list/${managerId}`);
      return await response.data;
    } catch (error) {
      console.error(`Error fetching employee data by user ID: ${error}`);
      throw error;
    }
  }

  async getCertsByPartialName(partialName) {
    try {
      const response = await client.get("certificate/search",
        {
          params: {
            partialName: partialName
          }
        });
      return await response.data;
    } catch (error) {
      console.error(`Error fetching certificates by partial name: ${error}`);
      throw error;
    }
  }

  async getByName(entityName, name, userName='') {
    try {
      const response = await client.get(`${entityName}/name/${name}`);
      return await response.data;
    } catch (error) {
      console.error(`Error fetching certificate by name: ${error}`);
      throw error;
    }
  }

  async importEmployee(jsonimpt) {
    try {
      const response = await axios.post(`${this.API_URL}/employee/addall/`,jsonimpt);
      return await response.data;
    } catch (error) {
      console.error(`Error fetching employee data by user ID: ${error}`);
      throw error;
    }
  }

  async updateOwnCertStatus(id, status) {
    try {
      const response = await client.put(`own-cert/update-status/${id}/${status}`);
      return await response.data;
    } catch (error) {
      console.error(`Error updating status in own certificate id: ${id}, ${error}`);
      throw error;
    }
  }

  async updateCertIsActive(id) {
    try {
      const response = await client.put(`certificate/update-is-active/${id}`);
      return await response.data;
    } catch (error) {
      console.error(`Error updating data in certificate id: ${id}, ${error}`);
      throw error;
    }
  }
}

export default new APIServices();
