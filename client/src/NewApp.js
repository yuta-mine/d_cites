// import React, { useState, useEffect } from 'react';
// import SimpleStorageContract from './contracts/SimpleStorage.json';
// import getWeb3 from './getWeb3';

// import './App.css';

// function App() {
//   const [storageValue, setStorageValue] = useState(undefined);
//   const [web3, setWeb3] = useState(undefined);
//   const [accounts, setAccounts] = useState([]);
//   const [contract, setContract] = useState([]);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const web3 = await getWeb3();

//         const accounts = await web3.eth.getAccounts(); //ユーザアカウント

//         const networkId = await web3.eth.net.getId(); //現在のネットワークIDを取得
//         const deployedNetwork = SimpleStorageContract.networks[networkId];

//         //スマートコントラクトのインスタンス作成
//         const contract = new web3.eth.Contract(
//           SimpleStorageContract.abi,
//           deployedNetwork && deployedNetwork.address
//         );

//         setWeb3(web3);
//         setAccounts(accounts);
//         setContract(contract);
//       } catch (error) {
//         alert(
//           `Failed to load web3, accounts, or contract. Check console for details.`
//         );
//         console.error(error);
//       }
//     };
//     init();
//   }, []);

//   useEffect(() => {
//     const load = async () => {
//       await contract.methods.set(5).send({ from: accounts[1] });
//       const response = await contract.methods.get().call();
//       setStorageValue(response);
//     };
//     if (
//       typeof web3 !== 'undefined' &&
//       typeof accounts !== 'undefined' &&
//       typeof contract !== 'undefined'
//     ) {
//       load();
//     }
//   }, [web3, accounts, contract]);

//   if (typeof web3 === 'undefined') {
//     return <div>Loading Web3, accounts, and contract...</div>;
//   }

//   return (
//     <div className="App">
//       <div>The stored value is: {storageValue}</div>
//     </div>
//   );
// }

// export default App;
