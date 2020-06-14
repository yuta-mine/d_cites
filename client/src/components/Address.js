import React, { Component } from 'react';
import './Address.css';

class Address extends Component {
  render() {
    return (
      <div>
        <span className="address">Your Address : {this.props.account}</span>
      </div>
    );
  }
}
export default Address;
