import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import axios from "axios";
import AuthService from "../services/auth.service";

class Details extends Component {
  // constructor() {
  //   super();
  //   this.state = { loading: true };
  // }
  state = { loading: true, showModal: false, currentUser: { username: "" } };
  
  componentDidMount() {
    axios.get(`http://localhost:8080/pets/${this.props.params.id}`)
      .then(res => {
        console.log(res.data);
        this.setState(Object.assign({ loading: false }, res.data));
      })

      const currentUser = AuthService.getCurrentUser();
      this.setState({ currentUser: currentUser });
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, description, name, idPhoto1, idPhoto2, idPhoto3, userEmail, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel photo1={idPhoto1} photo2={idPhoto2} photo3={idPhoto3} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}`}</h2>
          {this.state.currentUser 
            ? ( <button onClick={this.toggleModal}>Adopt {name}</button> )
            : ( <button style={{backgroundColor:"gray"}}>Please login to adopt {name}</button> )
          }
          
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}? Contact the owner Now!</h1>
                <div className="buttons">
                  <a href={`mailto: ${userEmail}`}>Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
