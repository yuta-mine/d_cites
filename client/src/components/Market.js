import React from 'react';
import { withRouter } from 'react-router-dom';
import './Market.css';
import MicroModal from 'react-micro-modal';

function Market(props) {
  return (
    <div className="Market">
      {/* ここにマップ */}
      {/* <BrowserRouter> */}
      {props.products.map((product, key) => {
        return (
          <div className="Product" key={key}>
            <p className="ProductName">{product.name}</p>
            <img
              src={`https://ipfs.io/ipfs/${product.tokenURI}`}
              alt=""
              width="250"
              height="200"
              className="image"
            />
            <p className="Country">{product.country}</p>
            <p className="ProductPrice">
              ¥ {window.web3.utils.fromWei(product.price.toString(), 'Ether')}{' '}
              ETH
            </p>
            <p className="Owner">Owner: {product.owner}</p>
            <p className="Approver">Approver: {product.approver}</p>
            {!product.purchased ? (
              <button
                name={product.id}
                onClick={e => {
                  props.purchaseProduct(
                    e.target.name //イベントオブジェクトのname要素
                  );
                }}
                className="btn_square_pop_purchase"
              >
                purchase
              </button>
            ) : null}
            {!product.approvedFromOwnerToBuyer ? (
              <button
                value={product.buyer}
                name={product.id}
                onClick={e => {
                  props.approve(e.target.value, e.target.name);
                }}
                className="btn_square_pop_approve"
              >
                approve
              </button>
            ) : null}
            {!product.sended ? (
              <button
                name={product.id}
                value={product.price}
                onClick={e => {
                  props.sendMoney(
                    e.target.name, //イベントオブジェクトのname要素
                    e.target.value //イベントオブジェクトのvalue要s素
                  );
                }}
                className="btn_square_pop_send"
              >
                send
              </button>
            ) : null}
            {/* 証明書確認 */}
            <button className="btn_square_pop_certificate">
              <MicroModal
                style={{ width: '1000px' }}
                className="micromodal_certificate"
                trigger={handleOpen => (
                  <div onClick={handleOpen}>certificate</div>
                )}
                children={handleClose => (
                  <div>
                    <div
                      // onClick={handleClose}
                      className="micromodal_certificate_child"
                    >
                      <h2 className="certificate_demo_title">Certification</h2>
                      <span className="certificate_info_text">Owner is </span>
                      <p className="certificate_info_address">
                        {product.owner}{' '}
                      </p>
                      {/* <span className="certificate_info_text"> . </span> */}
                      <br />
                      <p></p>
                      <span className="certificate_info_text">
                        The name of product is{' '}
                      </span>
                      <span className="certificate_info">{product.name}</span>
                      <span className="certificate_info_text"> . </span>
                      <br />
                      <p></p>
                      <span className="certificate_info_text">
                        {' '}
                        The country of product is{' '}
                      </span>
                      <span className="certificate_info">
                        {product.country}{' '}
                      </span>
                      <span className="certificate_info_text"> . </span>
                      <br />
                      <p></p>
                      <span className="certificate_info_text">
                        {' '}
                        The price is{' '}
                      </span>
                      <span className="certificate_info">
                        {' '}
                        {window.web3.utils.fromWei(
                          product.price.toString(),
                          'Ether'
                        )}{' '}
                      </span>
                      <span className="certificate_info_text"> ETH . </span>
                      <br />
                      <p></p>
                      <span className="certificate_info_text">
                        Approver is{' '}
                      </span>
                      <p className="certificate_info_address">
                        {product.approver}
                      </p>
                      {/* <span className="certificate_info_text"> . </span> */}
                      <br />
                      <p></p>
                      {/* 購入済みかどうか */}
                      {product.purchased ? (
                        <div>
                          <span className="certificate_info_text">
                            This item has been
                          </span>
                          <span className="certificate_info"> purchased</span>
                          <span className="certificate_info_text"> by</span>
                          <p className="certificate_info_address">
                            {' '}
                            {product.buyer}
                          </p>
                          {/* <span>.</span> */}
                        </div>
                      ) : (
                        <div>
                          <span className="certificate_info_text">
                            This item has{' '}
                          </span>
                          <span className="certificate_info">not</span>
                          <span className="certificate_info_text"> been</span>
                          <span className="certificate_info"> purchased</span>

                          <span>.</span>
                        </div>
                      )}
                      <p></p>
                      {/* 承認済みかどうか */}
                      {product.approvedFromOwnerToBuyer ? (
                        <div>
                          <span className="certificate_info_text">
                            This item has been{' '}
                          </span>
                          <span className="certificate_info">approved</span>
                          <span className="certificate_info_text"> by</span>
                          <p className="certificate_info_address">
                            {' '}
                            {product.approver}
                          </p>
                          {/* <span>.</span> */}
                        </div>
                      ) : (
                        <div>
                          <span className="certificate_info_text">
                            This item has{' '}
                          </span>
                          <span className="certificate_info">not</span>
                          <span className="certificate_info_text"> been </span>
                          <span className="certificate_info"> approved</span>

                          <span>.</span>
                        </div>
                      )}
                      <p></p>
                      {/* 送金済みかどうか */}
                      {product.sended ? (
                        <div>
                          <span className="certificate_info_text">
                            This item has been
                          </span>
                          <span className="certificate_info"> sent</span>
                          <span className="certificate_info_text"> by</span>
                          <p className="certificate_info_address">
                            {' '}
                            {product.buyer}
                          </p>
                          {/* <span>.</span> */}
                        </div>
                      ) : (
                        <div>
                          <span className="certificate_info_text">
                            This item has{' '}
                          </span>
                          <span className="certificate_info">not</span>
                          <span className="certificate_info_text"> been</span>
                          <span className="certificate_info"> sent</span>
                          <span>.</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(Market);
