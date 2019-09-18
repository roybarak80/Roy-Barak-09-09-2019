import React, { Component } from 'react'
import './App.css'
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import axios from 'axios';
import ImgList from './Components/ImgList';
import SearchForm from './Components/SearchForm';


class App extends Component {
  state = {
    cow: '',
    text: '',
    users: [],
    imgs: [],
    loadingState: true
  }
  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'cats') => {

    axios
      .get(
        `/images/${query}`
      )
      .then(data => {
        this.setState({ imgs: data.data.results, loadingState: false });
      })
      .catch(err => {
        console.log('Error happened during fetching!', err);
      });
  };

  render() {
    return (
      <div>
        <SearchForm onSearch={this.performSearch} />
        <div class="container">
          {this.state.loadingState
            ? <p>Loading</p>
            : <ImgList data={this.state.imgs} />}
        </div>
      </div>
    )
  }
}

export default App
