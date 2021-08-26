import { useState, useEffect } from 'react';
import Homepage from './components/Homepage';
import { Switch, Route } from 'react-router-dom';
import Movie from './components/Movie';
import axios from 'axios';

function App() {
  const [state, setState] = useState([]);
  const apiUrl = `http://localhost:8080`;

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Homepage movies={state} />
        </Route>
        <Route path='/movie'>
          <Movie movies={state} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
