import './App.css';
import { Routes, Route} from "react-router-dom";
import Navbar from './components/partials/navbar';
import Main from './components/layouts/main';
import Library from './components/layouts/library';
import Login from './components/users/login';
import Register from './components/users/register';
import Footer from './components/partials/footer';
import BookDetails from './components/partials/bookDetails';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Main />} />
          <Route path = "/about" element = {<Main />} />
          <Route path = "/library" element = {<Library />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/login/register" element = {<Register />} />
          <Route path = "/library/bookdetails" element = {<BookDetails />} />
        </Routes>
        <Footer className="footerInApp"/>
    </div>
  );
}

export default App;
