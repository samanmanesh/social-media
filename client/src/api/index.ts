import axios from "axios";


export const instance = axios.create({
  baseURL: 'http://localhost:8800/api'
})

export * from './users';
export * from './posts';
export * from './login';
