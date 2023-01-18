import './App.css';

import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material'

import Navbar from './components/Navbar';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <Box width="400" sx={{ width: { xl: '1488px'}}} m="auto">
      <Navbar/>
      <Router>
        <Route path="/" component={Home}/>
        <Route path="/exercise/:id" component={ExerciseDetail}/>
      </Router>
      <Footer/>
    </Box>
  );
}

export default App;
