import React, { Component } from 'react';

export default class CroppedImage extends Component {

  state = {
    staff_fn: '',
    staff_sn: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [`${name}`]: value,
    })
  }

  handleReset = (e) => {
    this.props.reset();       
  }

  render() {

    return (
      <div className="image-display">
        <div className="image-wrapper">
          <img alt="Cropped Version" src={this.props.url} className="cropped-image"/>
          <img alt="Thumbnail" src={this.props.thumbnail} className="thumb-image"/>
          <button type="button" onClick={this.handleReset}>Start Again</button>
        </div>
      </div>
    )
  }
}