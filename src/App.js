import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

import SearchParams from "./components/SearchParams";
import Details from "./components/Details";
import ModifyPet from "./components/modify.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        //showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark" >
          <Link to={"/"} className="navbar-brand" style={{color:"white"}}>
            Adopt me
          </Link>
          <div className="navbar-nav mr-auto">
          
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link" style={{color:"white"}}>
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link" style={{color:"white"}}>
                  Add Pet
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link" style={{color:"white"}}>
                  My Pets
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item" >
                <a href="/login" className="nav-link" onClick={this.logOut} style={{color:"white"}}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link" style={{color:"white"}}>
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="btn">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<SearchParams />} />
            <Route path="/home" element={<SearchParams />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/modify/:id" element={<ModifyPet />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;