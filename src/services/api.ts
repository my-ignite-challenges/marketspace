import axios from "axios";

import { host } from "../secrets";

export const api = axios.create({
  baseURL: `http://${host}:3333`,
});
