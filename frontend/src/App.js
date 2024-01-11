import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Landing/Home';

function App() {
  return (
    < >
      <Router>
        <Routes>
          <Route path='/' Component={Home}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
