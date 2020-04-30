import React, { Component } from 'react';
import Marketplace from './abi/Marketplace.json';
import Web3 from 'web3';
import Address from './components/Address';
import Main from './components/Main';

import './App.css';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  //metamaskに繋ぐ
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    //アカウントの配列を定義
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId(); //5777
    //コントラクトアドレス、関数ハッシュ、コントラクトのハッシュを定義
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi, //変数、イベント、関数
        networkData.address //コントラクトアドレス
      );
      this.setState({ marketplace });
      //確認用
      // console.log(networkData.address);
      // console.log(networkData);
      // console.log(marketplace);

      // console.log(networkId);
      // console.log(window.web3.eth.net.getId());

      //確認用
      // console.log(accounts);
      // console.log(accounts[0]);
      // console.log(window.web3.eth.givenProvider.selectedAddress);
      // console.log(window);
      // console.log(window.web3);
      // console.log(window.web3.givenProvider);
      // console.log(window.web3.givenProvider.selectedAddress);

      //productCountメソッド(変数など)をcallする
      const productCount = await marketplace.methods.productCount().call();
      this.setState({ productCount });

      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product] //プロダクト一覧に一つ追加
        });
      }
      this.setState({ loading: false });
    } else {
      window.alert('Marketplace contract not deployed to detected network.');
    }

    console.log(this.state);
    console.log(this.state.products);
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    };
    //関数をフォームで呼び出す
    this.createProduct = this.createProduct.bind(this);
    this.purchaseProduct = this.purchaseProduct.bind(this);
  }

  createProduct(name, price) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .createProduct(name, price)
      .send({ from: this.state.account })
      .once('receipt', receipt => {
        this.setState({ loading: false });
      });
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .purchaseProduct(id)
      .send({ from: this.state.account, value: price })
      .once('receipt', receipt => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="App">
        <Address account={this.state.account} />
        <main>
          {this.state.loading ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : (
            <Main
              products={this.state.products}
              createProduct={this.createProduct}
              purchaseProduct={this.purchaseProduct}
            />
          )}
        </main>
      </div>
    );
  }
}

export default App;
