import axios from "axios";
import { NOCOCID_API } from "../../constant/api_link_constant";
import authHeader from "../author_serivce/authService";
const NOCID_API_REPOSITORIES = NOCOCID_API + "Repositories";
class RepositoryService {
  getAllRepositories() {
    return axios.get(NOCID_API_REPOSITORIES, { headers: authHeader() });
  }
}
export default new RepositoryService();
