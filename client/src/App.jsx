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

  //イーサリアム （メインネット、テストネット、またはローカル）metamaskに繋ぐ
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
    const accounts = await web3.eth.getAccounts(); //接続しているアカウントのアドレスを取得
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId(); //ネットワークのIDを取得。ローカルは5777、メインネット、テストネットで異なる
    //コントラクトアドレス、関数ハッシュ、コントラクトのハッシュを定義
    const networkData = Marketplace.networks[networkId]; //ネットワークにデプロイされているコントラクトを変数として定義
    if (networkData) {
      const marketplace = new web3.eth.Contract( // コントラクトのインスタンス化
        Marketplace.abi, //コントラクトのABI(変数、イベント、関数を含む)
        networkData.address //コントラクトアドレス
      );
      this.setState({ marketplace });
      console.log(accounts[0]);
      // console.log(window.web3.givenProvider.selectedAddress);

      //productCountメソッド(または変数など)を呼び出す。
      const productCount = await marketplace.methods.productCount().call(); //登録されている商品数を数える
      this.setState({ productCount });
      // console.log(this.state.productCount);
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
  }

  constructor(props) {
    super(props); //親クラスのコンポーネントを参照することを宣言
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    };
    //関数をフォームで呼び出す
    this.createProduct = this.createProduct.bind(this);
    this.purchaseProduct = this.purchaseProduct.bind(this);
    this.approve = this.approve.bind(this);
    this.sendMoney = this.sendMoney.bind(this);
    // this.safeTransferFrom = this.safeTransferFrom.bind(this);
    // this._setTokenURI = this._setTokenURI.bind(this);
  }

  // 商品登録
  createProduct(name, price, approver) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .createProduct(name, price, approver)
      .send({ from: this.state.account }) //sendはトランザクションを生成 ＝ ユーザのgas支払いを要求
      .once('receipt', receipt => {
        this.setState({ loading: false });
      });
  }

  // 商品購入希望
  purchaseProduct(name) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .purchaseProduct(name)
      .send({ from: this.state.account })
      .once('receipt', receipt => {
        this.setState({ loading: false });
      });
  }

  // 購入者へ商品の所有権移転承認
  approve(value, name) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .approve(value, name)
      .send({ from: this.state.account })
      .once('receipt', receipt => {
        this.setState({ loading: false });
      });
  }

  // 送金

  sendMoney(id, price) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .sendMoney(id)
      .send({ from: this.state.account, value: price }) //sendはトランザクションを生成 ＝ ユーザのgas支払いを要求
      .once('receipt', receipt => {
        this.setState({ loading: false });
      });
  }

  // 商品の所有権移転
  // safeTransferFrom(owner, buyer, name) {
  //   this.setState({ loading: true });
  //   this.state.marketplace.methods
  //     .safeTransferFrom(owner, buyer, name)
  //     .send({ from: this.state.account }) //sendはトランザクションを生成 ＝ ユーザのgas支払いを要求
  //     .once('receipt', receipt => {
  //       this.setState({ loading: false });
  //     });
  // }

  // 画像URI登録
  // _setTokenURI(name, value) {
  //   this.setState({ loading: true });
  //   this.state.marketplace.methods
  //     ._setTokenURI(name, value)
  //     .send({ from: this.state.account })
  //     .once('receipt', receipt => {
  //       this.setState({ loading: false });
  //     });
  // }

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
              approve={this.approve}
              sendMoney={this.sendMoney}
              // safeTransferFrom={this.safeTransferFrom}
              // _setTokenURI={this._setTokenURI}
            />
          )}
        </main>
      </div>
    );
  }

  confirm() {}
}

export default App;
