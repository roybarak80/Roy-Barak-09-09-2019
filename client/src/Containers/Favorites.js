import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoritesList from '../Components/FavoritesList';
import Fade from 'react-reveal/Fade';

class Favorites extends Component {

  render() {
    const { currFavorites } = this.props;
    return (
      <div>
        <Fade fadeInUp>
          <FavoritesList currFavorites={currFavorites}></FavoritesList>
        </Fade>
      </div>

    )
  }
}

const mapStateToProps = state => {

  return {
    currFavorites: state.sitesReducer.currFavorites,

  }
}

export default connect(mapStateToProps, null)(Favorites);

