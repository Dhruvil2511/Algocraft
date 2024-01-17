import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Landing/Home';
import Authentication from './components/User/Authentication';
import Layout from './components/Content/Layout';
import CodingSheet from './components/Content/CodingSheet';

function App() {
  return (
    < >
      <Router>
        <Routes>
          <Route exact path='/' Component={Home}></Route>
          <Route path='/login' Component={Authentication}></Route>
          <Route path='/register' Component={Authentication}></Route>
          <Route path='/coding-sheets' Component={Layout}></Route>
          <Route path='/upcoming-contests' Component={Layout}></Route>
          <Route path='/coding-resources' Component={Layout}></Route>
          <Route path='/discussion' Component={Layout}></Route>
          <Route path='/coding-ide' Component={Layout}></Route>


        </Routes>
      </Router>
    </>
  );
}

export default App;
