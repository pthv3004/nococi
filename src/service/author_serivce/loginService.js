import axios from "axios";
import { NOCOCID_API } from "../../constant/api_link_constant";
import authHeader from "./authService";
// eslint-disable-next-line no-unused-vars

const NOCID_API_ACCOUNT = NOCOCID_API + "Accounts";
class LoginSerivce {
  async login(loginRequest) {
    const response = await axios.post(
      NOCID_API_ACCOUNT + "/login",
      loginRequest
    );
    if (response.data.jwtToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
  getGithubUri() {
    return axios.get(NOCOCID_API + "/Login/Github");
  }
  // async loginWithGithub(githubUri) {
  //   const response = await axios.get(githubUri);
  //   if (response.data.accessToken) {
  //     localStorage.setItem("user", JSON.stringify(response.data));
  //   }
  //   return response.data;
  // }

  logout() {
    return axios.post(
      NOCID_API_ACCOUNT + "/logout",
      {},
      { headers: authHeader() }
    );
  }
  register(signupRequest) {
    return axios.post(NOCID_API_ACCOUNT + "/register", signupRequest);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new LoginSerivce();
