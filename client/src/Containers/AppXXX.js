import React from 'react';
import NavBar from '../Components/NavBar';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Favorites from './Favorites';
import SideMenu from '../Components/SideMenu';
//require('dotenv').config()

const App = ({ isDarkTheme }) => (

  <BrowserRouter>
    <div className={isDarkTheme ? 'App dark-theme-body' : 'App'}>

      <NavBar />

      <div className="content-wrapper ">

        <div className="main-content">

          <div className="container">
            <div className="row ">
              <div className="col-lg-12 mt-4">

                <Route path="/" exact component={Home} />
                <Route path="/Favorites" component={Favorites} />

              </div>
            </div>
          </div>
        </div>

        <div className="side-menu-wrapper">
          <SideMenu></SideMenu>
        </div>
      </div>
    </div>

  </BrowserRouter>
);


const mapStateToProps = state => {
  return {
    isDarkTheme: state.sitesReducer.isDarkTheme,
  }
}

export default connect(mapStateToProps)(App);
