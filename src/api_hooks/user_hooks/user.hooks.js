import API from "../../config/api.config";

export const getCurrentUser = async () => {
  try {
    const res = await API.get("/api/user/currentUser");
    return res.data;
  } catch (error) {
    console.log("getUserError--->>", error);

    throw new Error(error);
  }
};

export const updateCurrentUser = async (payLoad) => {
  try {
    const res = await API.put("/api/user/currentUser", payLoad);
    return res.data;
  } catch (error) {
    console.log("updateCurrentUser--->>", error);
    throw new Error(error);
  }
};
