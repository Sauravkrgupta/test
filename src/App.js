import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CarList from './components/CarList';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={CarList} />
        <Route path="/page/:page" component={CarList} />
      </div>
    </Router>
  );
}

export default App;
