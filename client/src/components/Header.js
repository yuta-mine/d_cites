import React from 'react';
import Address from './Address';
import './Header.css';
import exhibiter from '../image/exhibiter.jpg';
import buyer from '../image/buyer.jpg';
import approver from '../image/approver.jpg';

function Header(props) {
  return (
    <div className="header">
      <div className="header_context"></div>
      <div className="header_main">
        <h1 className="title">D-CITES</h1>
        <p className="subtitle">The decentralized market for CITES</p>
      </div>
      <div className="header_context">
        <div className="header_icon">
          {props.account === '0x6a32BB6BC20237D51F2C7cb86a3d1bca4A340693' ? (
            <div>
              <div className="userName">Approver</div>
              <img
                src={approver}
                alt=""
                id="head_img"
                // width="100"
                // height="70"
                className="header_image"
              />
              {/* <Address className="your_address" account={props.account} /> */}
            </div>
          ) : props.account === '0x664350EC67daDC0aAe7f260f888A192D7371E2b7' ? (
            <div>
              <div className="userName">Buyer</div>
              <img
                src={buyer}
                alt=""
                id="head_img"
                // width="100"
                // height="70"
                className="header_image"
              />

              {/* <Address className="your_address" account={props.account} /> */}
            </div>
          ) : (
            <div>
              <div className="userName">Exhibiter</div>
              <img
                src={exhibiter}
                alt=""
                id="head_img"
                // width="100"
                // height="70"
                className="header_image"
              />
              {/* <Address className="your_address" account={props.account} /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
