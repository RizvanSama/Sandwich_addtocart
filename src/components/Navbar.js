import React from "react";
import { BrowserRouter as Router, Link  } from 'react-router-dom';

function Navbar() {
  return (
    <Router>
      
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Orders">Orders</Link>
          </li>
        </ul>
      </Router>
  )
}

export default Navbar;