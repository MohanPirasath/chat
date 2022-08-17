// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Avatar from './pages/Avatar';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/setavatar" element={<Avatar/>} />
        <Route path="/" element={<Chat/>} />
      </Routes>
    </div>
  );
}

export default App;
