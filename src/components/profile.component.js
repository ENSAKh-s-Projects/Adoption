import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Pet from "./Pet";
import axios from "axios";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "", email:""},
      pets: {}
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    axios.get(`http://localhost:8080/pets?userEmail=${currentUser.email}`)
      .then(res => {
        console.log(res);
        this.setState({pets: res.data});
      })
      
  }

  render() {
 
    return (
      <div className="search-ok">
      {!this.state.pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        this.state.pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              //images={pet.images}
              city={pet.city}
              idPhoto1={pet.idPhoto1}
              idPhoto2={pet.idPhoto1}
              idPhoto3={pet.idPhoto1}
              id={pet.id}
              userEmail={pet.userEmail}
            />
          );
        })
      )}
    </div>
    );
  }
}