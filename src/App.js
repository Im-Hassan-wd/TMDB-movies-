import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Navbar from './components/Navbar';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <div className="App">
      <div className="content">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/movies/:id'>
              <MovieDetails />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App
