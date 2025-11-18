import { useQuery } from "@tanstack/react-query";
import API from "../config/api.config";

const getHealthCheck = async () => {
  try {
    const response = await API.get("/api/healthcheck");
    return response.data;
  } catch (error) {
    console.log("GET Error:", error);
    throw error;
  }
};

export const useHealthCheck = () => {
  return useQuery({
    queryFn: getHealthCheck,
    queryKey: ["HEALTH_CHECK"],
  });
};
