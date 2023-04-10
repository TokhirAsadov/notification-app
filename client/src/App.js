import './App.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Login from "./pages/Login";
import SuperAdmin from "./pages/SuperAdmin";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/super/*" element={<SuperAdmin />}/>
        <Route exact path="/user/*" element={<UserPage />}/>
      </Routes>
    </Router>
   );
}

export default App;
