import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoritesList from '../Components/FavoritesList';
import { onSelectCityFromFavorites } from '../actions/sitesActions';

import Fade from 'react-reveal/Fade';

class Favorites extends Component {

  render() {
    const { currFavorites, onSelectCityFromFavorites } = this.props;
    return (
      <div>
        <Fade fadeInUp>
          <FavoritesList currFavorites={currFavorites} onSelectCityFromFavorites={onSelectCityFromFavorites}></FavoritesList>
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

const mapDispatchToProps = dispatch => ({

  onSelectCityFromFavorites: (foo) => { dispatch(onSelectCityFromFavorites(foo)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

