import axios from "axios";
import { NOCOCID_API } from "../../constant/api_link_constant";
import authHeader from "../author_serivce/authService";
const NOCID_API_EMPLOYEE = NOCOCID_API + "Employees";
class EmployeeService {
  getEmployeeById(id) {
    return axios.get(NOCID_API_EMPLOYEE + "/" + id,{headers: authHeader()});
  }
}
export default new EmployeeService();
