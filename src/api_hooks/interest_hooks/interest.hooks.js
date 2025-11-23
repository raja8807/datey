import { useQuery } from "@tanstack/react-query";
import API from "../../config/api.config";

export const fetchInterests = async () => {
  try {
    const res = await API.get("/api/interests");
    return res.data;
  } catch (error) {
    console.log("getUserError--->>", error);

    throw new Error(error);
  }
};

export const useFetchInterests = () => {
  return useQuery({
    queryKey: ["INTERESTS"],
    queryFn: fetchInterests,
  });
};
