//import React from "react";
//JSX transform HTML tags to js code (below)
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";

const currentUser = AuthService.getCurrentUser();

const Pet = (props) => {
  const { name, animal, breed, city, idPhoto1, id, userEmail } = props;
  const link = "http://localhost:8080/download/" + idPhoto1;
  const deleteLink = "http://localhost:8080/pets/" + id;

  const [showModal, setShowModal] = useState(false);


  function deletePet(){
    axios.delete(deleteLink); 
    window.location.reload(false);
  }
  return (
    <div className="container">
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={link} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}`}</h2>
        </div>
      </Link>
      {(currentUser != null) && (currentUser.email === userEmail) && ( 
        <div className="mini-container">
          <Link to={`/modify/${id}`}><div className="modify" >Modify</div></Link>
          <div className="delete" onClick={() => setShowModal(!showModal)}>Delete</div>
        </div>
        ) 
      }

        {showModal ? (
            <Modal>
              <div>
                <h1>Are you sure u want to delete {name}?</h1>
                <div className="buttons">
                  <button onClick={deletePet}>Yes</button>
                  <button onClick={() => setShowModal(!showModal)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
      
     
    </div>
  );
};

export default Pet;

// return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.animal),
//     React.createElement("h2", {}, props.type)]);
