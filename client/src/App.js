import './App.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Login from "./pages/Login";
import SuperAdmin from "./pages/SuperAdmin";

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/super/*" element={<SuperAdmin />}/>
      </Routes>
    </Router>
   );
}

export default App;
