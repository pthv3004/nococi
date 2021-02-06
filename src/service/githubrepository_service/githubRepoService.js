import axios from "axios";
import { NOCOCID_API } from "../../constant/api_link_constant";
import authHeader from "../author_serivce/authService";
const NOCID_API_GITHUBREPOSITORY = NOCOCID_API + "GithubRepository";
class GithubRepositoryService {
  refreshRepository(thirdPartyId){
    return axios.post(NOCID_API_GITHUBREPOSITORY + '/refresh-repo?thirdPartyId=' + thirdPartyId,{},{headers:authHeader()});
  }
}
export default new GithubRepositoryService();
