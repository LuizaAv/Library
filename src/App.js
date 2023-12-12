import './App.css';
import { Routes, Route} from "react-router-dom";
import Navbar from './components/partials/navbar';
import Main from './components/layouts/main';
import About from './components/layouts/about';
import Library from './components/layouts/library';
import Contact from './components/layouts/contact';
import Login from './components/users/login';
import Search from './components/partials/search';
import Register from './components/users/register';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Main />} />
          <Route path = "/about" element = {<About />} />
          <Route path = "/library" element = {<Library />} />
          <Route path = "/contact" element = {<Contact />} />
          <Route path = "/search" element = {<Search />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/register" element = {<Register />} />
        </Routes>
      
    </div>
  );
}

export default App;
