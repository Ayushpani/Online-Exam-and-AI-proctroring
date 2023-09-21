import { useLocation } from 'react-router-dom'
import React from 'react';
import './App.css';

import { Brand, Feature, Navbar } from './components';
import{ Footer, Header, Possibility, WhatGPT3} from './containers'

const App = () => {
  const location = useLocation();
  const email = location.state.id;
  return (
    <div className= "UserApp">
      <div className = "gradient__bg">
        <Navbar email = {email}/>
        <Header />
      </div>
      <Brand />
      <WhatGPT3 />
      <Footer />
    </div>
  );
}
 
export default App;
