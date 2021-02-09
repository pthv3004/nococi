import axios from "axios";
import { NOCOCID_API } from "../../../constant/api_link_constant";
import authHeader from "../../author_serivce/authService";

const NOCOCID_API_SPRINT = NOCOCID_API + "Sprints";

class SprintService {
  createSprint(projectId, sprintRequest) {
    return axios.post(
      NOCOCID_API_SPRINT + "/?pid=" + projectId,
      sprintRequest,
      { headers: authHeader() }
    );
  }
  getAllSprint(projectId) {
    return axios.get(NOCOCID_API_SPRINT + "?pid=" + projectId, {
      headers: authHeader()
    });
  }
}

export default new SprintService();
