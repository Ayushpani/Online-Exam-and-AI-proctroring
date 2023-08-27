import React from 'react';
import './App.css';

import { Article, Brand, Cta, Feature, Navbar } from './components';
import{ Blog, Footer, Header, Possibility, WhatGPT3} from './containers'

const App = () => {
  return (
    <div className= "UserApp">
      <div className = "gradient__bg">
        <Navbar />
        <Header />
      </div>
      <Brand />
      <Article />
      <WhatGPT3 />
      <Cta />
      <Blog />
      <Footer />
    </div>
  );
}
 
export default App;
