import React, { Component } from "react";

import AuthService from "../services/auth.service";
import PhotoService from "../services/photo.service";
import PetService from "../services/pet.service"


export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeAnimal = this.onChangeAnimal.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onPhoto1Change = this.onPhoto1Change.bind(this);
    this.onPhoto2Change = this.onPhoto2Change.bind(this);
    this.onPhoto3Change = this.onPhoto3Change.bind(this);

    this.state = {
      photo1: undefined,
      photo2: undefined,
      photo3: undefined,
      currentUser: { username: "" , email: ""},
      animal : "",
      breed : "",
      city : "", 
      description : "", 
      idPhoto1 : undefined, 
      idPhoto2 : undefined, 
      idPhoto3 : undefined, 
      name : "", 
      successful: false,
      message: ""
    };


  }
  

  componentDidMount() {

    const user = AuthService.getCurrentUser();
      this.setState({
        currentUser: user
      });
  }


 
  onChangeAnimal(e) {
    this.setState({
      animal: e.target.value
    });
  }

  onChangeBreed(e) {
    this.setState({
      breed: e.target.value
    });
  }
  onChangeCity(e) {
    this.setState({
      city: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onPhoto1Change( event ) {
    this.setState({ photo1: event.target.files[0] });
  };

  onPhoto2Change (event) {
    this.setState({ photo2: event.target.files[0] });
  };

  onPhoto3Change (event) {
    this.setState({ photo3: event.target.files[0] });
  };

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    PhotoService.upload(this.state.photo1)
    .then(response => 
      this.setState({ idPhoto1: response.data.message}, 
        () => PhotoService.upload(this.state.photo2).then(response => 
          this.setState({ idPhoto2: response.data.message}, 
            () => PhotoService.upload(this.state.photo3).then(response => 
              this.setState({ idPhoto3: response.data.message}, 
                () => PetService.register(
                  this.state.animal,
                  this.state.breed,
                  this.state.city,
                  this.state.description,
                  this.state.idPhoto1,
                  this.state.idPhoto2,
                  this.state.idPhoto3,
                  this.state.name,
                  this.state.currentUser.email
                ).then(
                  response => {
                    alert(response.data.message);
                    this.setState({
                      message: response.data.message,
                      successful: true
                    });
                  },
                  error => {
                    const resMessage =
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString();
          
                    this.setState({
                      successful: false,
                      message: resMessage
                    });
                  }
                )
              )
            ),
          )
        )

      )
    );
    // PhotoService.upload(this.state.photo2).then(response => 
    //   this.setState({ idPhoto2: response.data.message}, 
    //     () => console.log(this.state.idPhoto1), 
    //   )
    // );
    // PhotoService.upload(this.state.photo3).then(response => 
    //   this.setState({ idPhoto3: response.data.message}, 
    //     () => PetService.register(
    //       this.state.animal,
    //       this.state.breed,
    //       this.state.city,
    //       this.state.description,
    //       this.state.idPhoto1,
    //       this.state.idPhoto2,
    //       this.state.idPhoto3,
    //       this.state.name,
    //       this.state.currentUser.email
    //     ).then(
    //       response => {
    //         alert(response.data.message);
    //         this.setState({
    //           message: response.data.message,
    //           successful: true
    //         });
    //       },
    //       error => {
    //         const resMessage =
    //           (error.response &&
    //             error.response.data &&
    //             error.response.data.message) ||
    //           error.message ||
    //           error.toString();
  
    //         this.setState({
    //           successful: false,
    //           message: resMessage
    //         });
    //       }
    //     )
    //   )
    // );


      // PetService.register(
      //   this.state.animal,
      //   this.state.breed,
      //   this.state.city,
      //   this.state.description,
      //   this.state.idPhoto1,
      //   this.state.idPhoto2,
      //   this.state.idPhoto3,
      //   this.state.name,
      //   this.state.currentUser.email
      // ).then(
      //   response => {
      //     alert(response.data.message);
      //     this.setState({
      //       message: response.data.message,
      //       successful: true
      //     });
      //   },
      //   error => {
      //     const resMessage =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();

      //     this.setState({
      //       successful: false,
      //       message: resMessage
      //     });
      //   }
      // );

  }

  render() {
    const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <form
            onSubmit={this.handleRegister}
          >
              <div className="form-group">
                <label htmlFor="animal">
                    Animal
                    <select
                      id="animal"
                      value={this.state.animal}
                      onChange={this.onChangeAnimal}
                    >
                      <option />
                      {ANIMALS.map((animal) => (
                        <option value={animal} key={animal}>
                          {animal}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="breed">
                    Breed
                    <input
                    type="text"
                    className="form-control"
                    name="breed"
                    value={this.state.breed}
                    onChange={this.onChangeBreed}
                  />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={this.state.city}
                    onChange={this.onChangeCity}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="photo1">Photo 1</label>
                  <input
                    type="file"
                    className="form-control"
                    name="photo1"
                    onChange={this.onPhoto1Change}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="photo2">Photo 2</label>
                  <input
                    type="file"
                    className="form-control"
                    name="photo2"
                    onChange={this.onPhoto2Change}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="photo3">Photo 3</label>
                  <input
                    type="file"
                    className="form-control"
                    name="photo3"
                    onChange={this.onPhoto3Change}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block loginBtn" type="submit">Add</button>
                </div>
            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}