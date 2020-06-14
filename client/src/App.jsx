import React, { Component } from 'react';
import Marketplace from './abi/Marketplace.json';
import Web3 from 'web3';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Exhibit from './components/Exhibit';
import Market from './components/Market';
import Footer from './components/Footer';
import ipfs from './ipfs';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import './App.css';

class App extends Component {
  async componentDidMount() {
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
      // console.log(accounts[0]);
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
      loading: true,
      buffer: null,
      ipfsHash: [],
      open: false,
      anchorEl: null
    };
    //関数をフォームで呼び出す
    this.createProduct = this.createProduct.bind(this);
    this.purchaseProduct = this.purchaseProduct.bind(this);
    this.approve = this.approve.bind(this);
    this.sendMoney = this.sendMoney.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // 画像アップロード
  captureFile(e) {
    e.preventDefault();
    const file = e.target.files[0]; //ファイルの一個目
    const reader = new window.FileReader(); //ファイルを読み込む
    reader.readAsArrayBuffer(file); //ファイルをメモリ上に確保されているバッファ（バイナリデータ（コンピュータが読めるようにしたデータ）を格納する領域）配列として読み込む
    reader.onloadend = () => {
      //読み込みが終了した時に発生
      this.setState({ buffer: Buffer(reader.result) }); //読み込んだデータをバッファとして、stateのbufferに格納
      console.log('buffer', this.state.buffer);
    };
  }

  // 画像登録
  fileUpload(e) {
    e.preventDefault();
    ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.setState({ ipfsHash: result[0].hash });
      console.log('ipfsHash : ', this.state.ipfsHash);
    });
  }

  // 商品登録
  createProduct(country, name, price, approver, tokenURI) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .createProduct(country, name, price, approver, tokenURI)
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

  handleClick = e => {
    this.setState({
      open: true,
      anchorEl: e.currentTarget
    });
    // this.setState({ anchorEl: e.currentTarget });
    // console.log(e.currentTarget);
    console.log(this.state.open);
    console.log(this.state.anchorEl);
    // console.log('handleClick');
  };

  handleClose = () => {
    this.setState({ open: false, anchorEl: null });
    // this.setState({ anchorEl: null });
    // console.log('handleClose');
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="menu">
            <div className="humbagar_btn">
              <p></p>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={this.handleClick}
                className="main_menu_btn"
              >
                <span></span>
              </Button>
            </div>
            <Header account={this.state.account} />
            <div>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Link to="/" className="menu_tab_name">
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/market" className="menu_tab_name">
                    Market
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/exhibit" className="menu_tab_name">
                    Exhibit
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </div>

          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route
              path="/market"
              render={() => (
                <Market
                  products={this.state.products}
                  purchaseProduct={this.purchaseProduct}
                  approve={this.approve}
                  sendMoney={this.sendMoney}
                  handleToCertificatePage={this.handleToCertificatePage}
                />
              )}
            />
            <Route
              path="/exhibit"
              render={() => (
                <Exhibit
                  ipfsHash={this.state.ipfsHash}
                  createProduct={this.createProduct}
                  captureFile={this.captureFile}
                  fileUpload={this.fileUpload}
                  account={this.state.account}
                />
              )}
            />
          </Switch>
          <Footer className="footer" />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
