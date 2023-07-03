import logo from './logo.svg';
import  Navbar  from "./components/Navbar"
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Weather from './pages/Weather';
import Notes from './pages/Notes';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Weather/>}/>
        <Route path="/Notes" element={<Notes/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
