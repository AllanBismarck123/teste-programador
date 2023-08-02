import axios from "axios";

const baseURL = 'https://backendtesteprogramador.onrender.com';

const client = axios.create({
  baseURL: baseURL
})

export default client;