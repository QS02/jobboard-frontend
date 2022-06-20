import { webApi } from "@api/config";

class AuthApi {
  register = (body) => webApi().post("/auth/register", body);
  login = (body) => webApi().post("/auth/login", body);
  refreshToken = (body) => webApi().post("/auth/refresh-tokens", body);
  logout = (body) => webApi().post("/auth/logout", body);
}

export const authApi = new AuthApi();
