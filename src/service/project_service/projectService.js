import axios from "axios";
import { NOCOCID_API } from "../../constant/api_link_constant";
import authHeader from "../author_serivce/authService";

const NOCOCID_API_PROJECT = NOCOCID_API + "Projects";

class ProjectService {
    create(projectRequest){
        return axios.post(NOCOCID_API_PROJECT, projectRequest, {headers:authHeader()});
    }
}

export default new ProjectService;
