import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

interface Props {
  username: string;
  password: string;
  email?: string;
}

export default function AuthLoginQuery(username :string, password:string) {
  const fetchAuthLogin = async () => {
    if (username && password) {
      try {
        const { data } = await axios.post("http://localhost:8800/api/login", {
          username: username,
          password: password,
        });
        return data;
      } catch (error) {
        console.log("error", error);
      }
    }
  };
 const { data, status  } = useQuery("authLogin", fetchAuthLogin);
   return { data, status };
}
