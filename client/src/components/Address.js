import React, { Component } from 'react';

class Address extends Component {
  render() {
    return (
      <div>
        <span>アカウントアドレス：{this.props.account}</span>;
      </div>
    );
  }
}
export default Address;
