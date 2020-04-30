import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <div>
        <h1>商品登録</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            const name = this.productName.value;
            const price = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              'Ether'
            );
            this.props.createProduct(name, price);
          }}
        >
          <div>
            <input
              type="text"
              ref={input => {
                this.productName = input;
              }}
              placeholder="Product Name"
            />
          </div>
          <div>
            <input
              type="text"
              ref={input => {
                this.productPrice = input;
              }}
              placeholder="Product Price"
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
        <p> </p>

        <h1>商品購入</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product, key) => {
              return (
                <tr key={key}>
                  <th>{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      'Ether'
                    )}{' '}
                    Eth
                  </td>
                  <td>{product.owner}</td>
                  <td>
                    {!product.purchased ? (
                      <button
                        name={product.id}
                        value={product.price}
                        onClick={e => {
                          this.props.purchaseProduct(
                            e.target.name,
                            e.target.value
                          );
                        }}
                      >
                        Buy
                      </button>
                    ) : null}
                  </td>
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
