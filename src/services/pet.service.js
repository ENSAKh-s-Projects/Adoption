import axios from "axios";

const API_URL = "http://localhost:8080/";

class PetService {
  register(animal, breed, city, description, idPhoto1, idPhoto2, idPhoto3, name, userEmail) {
    return axios.post(API_URL + "pets", {
      animal,
      breed,
      city,
      description,
      idPhoto1,
      idPhoto2,
      idPhoto3,
      name,
      userEmail
    });
  }

  update(petId, animal, breed, city, description, idPhoto1, idPhoto2, idPhoto3, name, userEmail){
    return axios.put(API_URL + "pets/" + petId, {
      animal,
      breed,
      city,
      description,
      idPhoto1,
      idPhoto2,
      idPhoto3,
      name,
      userEmail
    });
  }

}

export default new PetService();