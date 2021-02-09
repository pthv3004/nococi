import axios from "axios";
import { NOCOCID_API } from "../../constant/api_link_constant";
import authHeader from "../author_serivce/authService";
const NOCID_API_THIRDPARTYACCOUNT = NOCOCID_API + "ThirdPartyAccounts";
class ThirdPartyAccountService {
    getThirdPartyAccount(){
      return axios.get(NOCID_API_THIRDPARTYACCOUNT,{headers:authHeader()});
    }
    getCollaboratorsRepository(thirdPartyId){
      return axios.get(NOCID_API_THIRDPARTYACCOUNT + '/' + thirdPartyId + '/collaborators-repositories',{headers:authHeader()});
    }
  }
  export default new ThirdPartyAccountService();