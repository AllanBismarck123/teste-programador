import axios from "axios";

const baseURL = 'localhost:4000';

const client = axios.create({
  baseURL: "http://" + baseURL
})

export default client;