import axios from "axios";

import Constants from "expo-constants";
import { supabase } from "../lib/Supabase";

const { API_URL } = Constants.expoConfig.extra;

const API = axios.create({
  baseURL: API_URL, // Replace with your backend URL
  timeout: 100000,
});

// Optional: attach token if using auth
API.interceptors.request.use(async (config) => {
  try {
    const session = await supabase.auth.getSession();

    const token = session?.data?.session?.access_token; // get from storage if needed
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsImtpZCI6IkFKU3E2NWVXTWI4NkVVWE8iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2d4aG51enBmaW5xcmJ6c2llZW5kLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkZjVkNmM0ZS01YmE1LTRhODItYTZlMy00MjMzZjNkNmZjNjUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzYzNjIxMDExLCJpYXQiOjE3NjM2MTc0MTEsImVtYWlsIjoiOTE3ODEyODA0ODU2QGRhdGV5LmFwcCIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTc2MzYwOTE0OH1dLCJzZXNzaW9uX2lkIjoiNThjNzU3NTQtMTMxNi00NjIwLTliNjEtNGUwYTViNmRlNWViIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.r9ko_ne2XidM_dmzdRpB35h_rwLeDLxt8v4DLWF1YnE";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (err) {
    console.log("reqErr-->", err);
  }
});

export default API;
