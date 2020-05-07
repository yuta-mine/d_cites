import React, { Component } from 'react';
// import Approver from './Approver';

class Main extends Component {
  render() {
    return (
      <div>
        {/* <Approver /> */}

        <h1>商品登録</h1>
        <form
          onSubmit={e => {
            //formのonSubmitでsubmitを検知してform.elementsから入力値を取得
            e.preventDefault(); //イベントをキャンセル
            const name = this.productName.value;
            //[wei] の値をその他の [ether] の単位に変換
            const price = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              'Ether'
            );
            const approver = this.productApprover.value;
            this.props.createProduct(name, price, approver);
          }}
        >
          {/* 名前登録 */}
          <div>
            <input
              type="text"
              ref={input => {
                this.productName = input;
              }}
              placeholder="名前"
            />
          </div>
          {/* 価格登録 */}
          <div>
            <input
              type="text"
              ref={input => {
                this.productPrice = input;
              }}
              placeholder="価格(ETH)"
            />
          </div>
          {/* 承認者登録 */}
          <div>
            <input
              type="text"
              ref={input => {
                this.productApprover = input;
              }}
              placeholder="承認者アドレス"
            />
          </div>
          <p></p>
          {/* 画像登録 */}
          {/* {
              const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
              const buf = buffer.Buffer(reader.result) // Convert data into buffer
              ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
                if (err) {
                  console.error(err)
                  return
                }
                let url = `https://ipfs.io/ipfs/${result[0].hash}`
                console.log(`Url --> ${url}`)
        })
      } */}
          {/* <div>
            <input
              type="text"
              ref={input => {
                this.productName = input;
              }}
              placeholder="Picture Name"
            />
          </div>
          <div>
            <input
              type="file"
              ref={input => {
                this.productPrice = input;
              }}
              placeholder="Picture File"
            />
          </div> */}
          <button type="submit">登録</button>
        </form>
        <p> </p>
        <p> </p>

        <h1>商品購入</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">tokenID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              {/* <th scope="col">画像</th> */}
              <th scope="col">承認者</th>
              <th scope="col">購入</th>
              <th scope="col">承認</th>
              <th scope="col">送金</th>
              {/* <th scope="col">移転</th> */}
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product, key) => {
              return (
                <tr key={key}>
                  {/* 商品ID */}
                  <th>{product.id.toString()}</th>

                  {/* 商品名 */}
                  <td>{product.name}</td>

                  {/* 商品価格 */}
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      'Ether'
                    )}{' '}
                    Eth
                  </td>

                  {/* 商品オーナー */}
                  <td>{product.owner}</td>

                  {/* 承認者 */}
                  <td>{product.approver}</td>

                  {/* 画像 */}
                  {/* <td>{product._tokenURI}</td> */}

                  {/* Buy購入希望ボタン */}
                  <td>
                    {!product.purchased ? (
                      <button
                        name={product.id}
                        // value={product.price}
                        onClick={e => {
                          this.props.purchaseProduct(
                            e.target.name //イベントオブジェクトのname要素
                            // e.target.value
                          );
                        }}
                      >
                        購入
                      </button>
                    ) : null}
                  </td>

                  {/* 承認ボタン */}
                  <td>
                    {!product.approvedFromOwnerToBuyer ? (
                      <button
                        value={product.buyer}
                        name={product.id}
                        onClick={e => {
                          this.props.approve(e.target.value, e.target.name);
                        }}
                      >
                        承認
                      </button>
                    ) : null}
                  </td>

                  {/* Send送金ボタン */}
                  <td>
                    {!product.sended ? (
                      <button
                        name={product.id}
                        value={product.price}
                        onClick={e => {
                          this.props.sendMoney(
                            e.target.name, //イベントオブジェクトのname要素
                            e.target.value //イベントオブジェクトのvalue要素
                          );
                        }}
                      >
                        送金
                      </button>
                    ) : null}
                  </td>

                  {/* safeTransferFrom移転ボタン */}
                  {/* <td>
                    {!product.transfered ? (
                      <button
                        value={product.owner}
                        value={product.buyer}
                        name={product.id}
                        onClick={e => {
                          this.props.safeTransferFrom(
                            e.target.value,
                            e.target.value, //イベントオブジェクトのname要素
                            e.target.name //イベントオブジェクトのvalue要素
                          );
                        }}
                      >
                        Transfer
                      </button>
                    ) : null}
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
