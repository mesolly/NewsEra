import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const pageSize = 9 ;
  const apiKey = process.env.REACT_APP_NEWS_API  ;
  const [progress, setProgress] = useState(0) ;
  const [mode, setMode] = useState('dark') ;

  const toggleMode = () =>{
      if(mode=='light'){
        setMode('dark') ;
        document.body.style.backgroundColor = 'white';
      }else{
        setMode('light') ;
        document.body.style.backgroundColor = '#303030';
      }
  }
    return (
        <Router>
          <LoadingBar
            color='#f11946'
            progress={progress}
            height = {4}
          />
          <NavBar toggleMode={toggleMode} mode={mode} />
          <Routes>
            <Route path="/" element={<News  mode={mode} setProgress={setProgress} apiKey = {apiKey} key="general" pageSize={pageSize} country="in" category="general"/>}/>
            <Route path="/entertainment" element={<News  mode={mode} setProgress={setProgress} apiKey = {apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}/>
            <Route path="/health" element={<News  mode={mode} setProgress={setProgress} apiKey = {apiKey} key="health" pageSize={pageSize} country="in" category="health"/>}/>
            <Route path="/sports" element={<News  mode={mode} setProgress={setProgress} apiKey = {apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}/>
            <Route path="/technology" element={<News  mode={mode} setProgress={setProgress} apiKey = {apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>}/>
          </Routes>
        </Router> 
    )
  
}

export default App
