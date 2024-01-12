import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Landing/Home';
import Authentication from './components/User/Authentication';

function App() {
  return (
    < >
      <Router>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/login' Component={Authentication}></Route>
          <Route path='/register' Component={Authentication}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
