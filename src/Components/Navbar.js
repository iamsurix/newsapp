import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";

const Navbar=()=> {
 
    return (
      
      <div>
       <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">News MonKEY</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <Link className="nav-link active" aria-current="page" to="/about">about</Link>
          <Link className="nav-link active" aria-current="page" to="/business">business</Link>
          <Link className="nav-link active" aria-current="page" to="/entertainment">entertainment</Link>
          <Link className="nav-link active" aria-current="page" to="/">general</Link>
          <Link className="nav-link active" aria-current="page" to="/health">health</Link>
          <Link className="nav-link active" aria-current="page" to="/science">science</Link>
          <Link className="nav-link active" aria-current="page" to="/sports">sports</Link>
          <Link className="nav-link active" aria-current="page" to="/technology">technology</Link>
      </ul>
    </div>
  </div>
</nav>
</div>

    )
  
}

export default Navbar
