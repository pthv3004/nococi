import axios from "axios";
import { NOCOCID_API } from "../../constant/api_link_constant";
import authHeader from "../author_serivce/authService";

const NOCOCID_API_PROJECT = NOCOCID_API + "Projects";

class ProjectService {
  create(projectRequest) {
    return axios.post(NOCOCID_API_PROJECT, projectRequest, {
      headers: authHeader(),
    });
  }
  getAllProject() {
    return axios.get(NOCOCID_API_PROJECT, { headers: authHeader() });
  }
  getProjectById(projectId) {
    return axios.get(NOCOCID_API_PROJECT + "/" + projectId, {
      headers: authHeader(),
    });
  }
}

export default new ProjectService();
