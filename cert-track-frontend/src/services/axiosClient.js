import axios from "axios";
import {API_BASE_URL , ACCESS_TOKEN} from "../constants"

const BASE_URL = API_BASE_URL + "/";
const REFRESH_TOKEN_URL = BASE_URL + "auth/refreshToken";

export function createAxiosClient({ options, getCurrentAccessToken, getCurrentRefreshToken, refreshTokenUrl, logout, setRefreshedTokens }) {
  const client = axios.create(options);

  client.interceptors.request.use(
    (config) => {
      if (config.authorization !== false) {
        const token = getCurrentAccessToken();
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
}

function getCurrentAccessToken() {
  // this is how you access the zustand store outside of React.
  //return useAuthStore.getState().accessToken;
  return localStorage.getItem(ACCESS_TOKEN);
}

function getCurrentRefreshToken() {
  // this is how you access the zustand store outside of React.
  //return useAuthStore.getState().refreshToken;
  return localStorage.getItem(ACCESS_TOKEN);
}

function setRefreshedTokens(tokens) {
  console.log("set tokens...");
}

async function logout() {
  console.log("logout...");
}

export const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
    },
  },
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl: REFRESH_TOKEN_URL,
  logout,
  setRefreshedTokens,
});