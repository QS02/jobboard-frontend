import { webApi } from "@api/config";

class ProfileApi {
  me = () => webApi({ auth: true }).get("/profile");
}

export const profileApi = new ProfileApi();
