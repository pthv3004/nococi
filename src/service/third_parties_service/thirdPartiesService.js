import axios from "axios";
import { NOCOCID_API } from "../../constant/api_link_constant";
import authHeader from "../author_serivce/authService";
const NOCID_API_THIRDPARTIES = NOCOCID_API + "ThirdParties";
class ThirdPartiesService {
  getGitHubLoginURI() {
    return NOCID_API_THIRDPARTIES + "/login/github?redirect_uri=http://localhost:3000/home";
  }
  loginWithGitHubURI() {
    return NOCID_API_THIRDPARTIES + "/login/github?redirect_uri=http://localhost:3000/login";
  }
}
export default new ThirdPartiesService();
