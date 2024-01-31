import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_NODE_URL,
    timeout: 60 * 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export default api