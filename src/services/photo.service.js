import axios from "axios";

const API_URL = "http://localhost:8080/";

class PhotoService {
    upload(file) {
      let formData = new FormData();
      formData.append("data", file);

      return axios.post(API_URL + "photos", formData);

    }
  
  }
  
  export default new PhotoService();