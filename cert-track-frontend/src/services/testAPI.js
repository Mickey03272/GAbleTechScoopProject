import { client } from "./axiosClient";

export function register({ email, password }) {
  return client.post("auth/register", { email, password }, { authorization: false });
}

export function login({ email, password }) {
  return client.post("auth/login", { email, password }, { authorization: false });
}

export function getProfile() {
  return client.get("/users/profile");
}

export async function getCertificate(){
  console.log(client);
  try {
    const response = await client.get("/certificate/");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}