import './App.css';
import About from './components/About';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
function App() {
  const [mode,setMode]=useState('light');
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert(
      {
        msg:message,
        type:type
      })
      setTimeout(() => {
        setAlert(null);
      }, 1500);
  }
  const toggleMode=()=>{
    if(mode==='light')
    {
        setMode('dark');
        document.body.style.backgroundColor='#343a40';
        //document.title="TextUtils- DarkMode";
        showAlert("Dark Mode has been enabled","success");
    }
    else{
       setMode('light');
       document.body.style.backgroundColor='white';
       //document.title="TextUtils- LightMode";
       showAlert("Dark Mode has been disabled","success");
    }
  }
  return (
    <Router>
      <Navbar title="TextUtils" aboutText="About TextUtils" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
    <div className="container my-3">
      <Routes>
        <Route path="/about" element={<About mode={mode}/>}/>
        <Route path="/" element={<TextForm heading="Try TextUtils - Word Counter, Character Counter, Remove Extra Spaces" mode={mode} showAlert={showAlert} heading2="Your Text Summary"/>}/>
      </Routes>
    </div>
    </Router>
);
}

export default App;
