import React from "react";
import { BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="main">
      <h1>Joe's Sandwich</h1>
      <ul className="header">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      <Switch>
        <Route exact path="/"><Home /></Route>
      </Switch>
      </div>
      </Router>
  )
}

export default App;