import React, { Component } from 'react';
import NProgress from 'nprogress';

const { REACT_APP_API_URL, REACT_APP_FETCH_URL } = process.env;

export default class DropBox extends Component {

  state={
    isActive: false,
  }

  handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    this.setState({
      isActive: true
    })
  }

  handleDragLeave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    this.setState({
      isActive: false
    })
  }

  handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  handleDrop = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    this.setState({
      isActive: false
    });

    const dt = e.dataTransfer;
    const file = dt.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'miwrqbm3' );

    NProgress.start();
   
    const { url, public_id } = await getCroppedURL(REACT_APP_API_URL, data);
    const thumbURL = getThumbURL(REACT_APP_FETCH_URL, public_id);  
    
    this.props.updateParent(url, thumbURL);
    NProgress.done();
  }

  render() {
    return (
      <div className={`Dropbox${this.state.isActive ? ' Dropbox--active': ''}`} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
        <p>Drop Photo Here</p>
      </div>
    )
  }
}

async function getCroppedURL(api, data) {
  const res = await fetch(api, {
    method: 'POST',
    body: data,
  }).then(res => res.json());

  const { public_id, secure_url } = res;
  return { url: secure_url, public_id };
}

function getThumbURL(fetchURL, public_id) {
  const trans = `c_thumb,g_face:center,h_128,q_auto:best,w_128/`;
  const url = fetchURL + trans + public_id + '.jpg';
  return url;
}