import axios from "axios";
import { notify } from "@/services/notify";
import { logError } from "@/utils/errors";

export async function getUser(userId: string): Promise<UserResponse> {
  return axios
    .get(`${process.env.VUE_APP_API_DOMAIN}/userss/${userId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      logError(error);
      notify.error("Unable to receive user's data");
      throw error;
    });
}

interface UserResponse {
  [key: string]: string;
}
