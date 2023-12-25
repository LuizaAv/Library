import './App.css';
import { Routes, Route} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import Navbar from './components/partials/navbar';
import Main from './components/layouts/main';
import Library from './components/layouts/library';
import Login from './components/users/login';
import Register from './components/users/register';
import Footer from './components/partials/footer';
import Bookdetails from './components/partials/bookdetails';

function App() {
  const [result, setResult] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get("http://localhost:3001/books");
        setResult(response.data)
      }catch (err){
        console.log("Handled error in fetching time: ",  err)
      }
    }

    fetchData();
  }, [])

  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Main data = {result}/>} />
          <Route path = "/about" element = {<Main data = {result} />} />
          <Route path = "/library" element = {<Library data = {result}/>} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/login/register" element = {<Register />} />
          <Route path = "/library/bookdetails/:id" element = {<Bookdetails />} />
        </Routes>
        <Footer className="footerInApp"/>
    </div>
  );
}

export default App;
