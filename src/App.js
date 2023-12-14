import './App.css';
import { Routes, Route} from "react-router-dom";
import Navbar from './components/partials/navbar';
import Main from './components/layouts/main';
import Library from './components/layouts/library';
import Login from './components/users/login';
import Search from './components/partials/search';
import Register from './components/users/register';
import Footer from './components/partials/footer';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Main />} />
          <Route path = "/about" element = {<Main />} />
          <Route path = "/library" element = {<Library />} />
          <Route path = "/search" element = {<Search />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/register" element = {<Register />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
