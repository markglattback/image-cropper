import React, { Component } from 'react';
import DropBox from './components/DropBox';
import CroppedImage from './components/CroppedImage';
import './App.css';

class App extends Component {
  
  state = {
    isActive: false,
    showImages: false,
    url: '',
    thumbURL: '',
  }

  handleFileDrop = (url, thumbURL) => {
    this.setState({
      url,
      thumbURL, 
      showImages: true,
    });
  }

  handleReset = () => {
    this.setState({
      isActive: false,
      showImages: false,
      url: '',
      thumbURL: '',
    })
  }

  render() {
    return (
      <div className="App">
        <main>
          {!this.state.showImages && <DropBox updateParent={this.handleFileDrop} />}
          {this.state.showImages && <CroppedImage url={this.state.url} thumbnail={this.state.thumbURL} reset={this.handleReset}/>}          
        </main>
      </div>
    );
  };
}

export default App;
