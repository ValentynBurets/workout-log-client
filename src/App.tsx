import './App.css';

import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { Box } from '@mui/material'

import Navbar from './components/Navbar';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import AuthorizationProvider from './components/authorization/AuthorizationProvider';
import LinkConfig from "./assets/jsonData/LinkConfig/LinkConfig.json";
import AuthorizedRoute from './components/roleRoutes/AuthRoute';

function App() {
  return (
    <div className="backgroung_style">
      <AuthorizationProvider>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to={LinkConfig.about}>About</Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* to add a new page just add a route here */}
          <AuthorizedRoute
            exact
            path={LinkConfig.exercise_management.exercise + "/:id"}
            component={ExerciseDetail}
            role={"All"}
          />
          <AuthorizedRoute
            exact
            path="/"
            component={Home}
            role={"All"}
          />
          <AuthorizedRoute
            exact
            path={LinkConfig.home}
            component={Home}
            role={"All"}
          />
        </Router>
      </AuthorizationProvider>
    </div>
  );
}

export default App;