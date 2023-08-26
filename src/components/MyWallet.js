import React,{useState,useEffect} from 'react'

import TxnActivity from './TxnActivity';
import Neon, { rpc, sc, u, wallet, tx } from "@cityofzion/neon-js";
// import {WalletConnectProvider} from "@cityofzion/wallet-connect-sdk-react";
// import WcSdk from '@cityofzion/wallet-connect-sdk-core'
// import SignClient from '@walletconnect/sign-client'

// const wcSdk = new WcSdk(await SignClient.init({
//   projectId: '9c380ba47b6fa8e1354bb21d66e3a351', // the ID of your project on Wallet Connect website
//   relayUrl: 'wss://relay.walletconnect.com', // we are using walletconnect's official relay server
//   metadata: {
//     name: 'MyApplicationName', // your application name to be displayed on the wallet
//     description: 'My Application description', // description to be shown on the wallet
//     url: 'http://127.0.0.1:3000/', // url to be linked on the wallet
//     // icons: ['https://myapplicationdescription.app/myappicon.png'] // icon to be shown on the wallet
//   }
// }))

let neoline;
let neolineN3;

function initDapi() {
    const initCommonDapi = new Promise((resolve, reject) => {
        window.addEventListener('NEOLine.NEO.EVENT.READY', (e) => {
            neoline = new e.target.NEOLine.Init();
            if (neoline) {
                resolve(neoline);
                console.log("dd")
            } else {
                reject('common dAPI method failed to load.');
            }
            console.log("listener")
        });
    });
    const initN3Dapi = new Promise((resolve, reject) => {
        window.addEventListener('NEOLine.N3.EVENT.READY', (e) => {
            neolineN3 = new e.target.NEOLineN3.Init();
            if (neolineN3) {
                resolve(neolineN3);
                console.log("ddN3")
            } else {
                reject('N3 dAPI method failed to load.');
            }
            console.log("n3 listener")
        });
    });
    initCommonDapi.then(() => {
        console.log('The common dAPI method is loaded.');
        return initN3Dapi;
    }).then(() => {
        console.log('The N3 dAPI method is loaded.');
    }).catch((err) => {
        console.log(err);
    })
};

initDapi();


const invoke = () =>{
  neoline.getPublicKey()
.then(publicKeyData => {
    const {
        address,
        publicKey
    } = publicKeyData;

    console.log('Account address: ' + address);
    console.log('Account public key: ' + publicKey);
})
.catch((error) => {
    const {type, description, data} = error;
    switch(type) {
        case 'NO_PROVIDER':
            console.log('No provider available.');
            break;
        case 'CONNECTION_DENIED':
            console.log('The user rejected the request to connect with your dApp');
            break;
        default:
            // Not an expected error object.  Just write the error to the console.
            console.error(error);
            break;
    }
});
}




export default function UserDetails(props) {
  const handleTicket = () => {
    props.setButton(1);
  };

  const handleConnectWallet = async () => {
    console.log("wallet connection")
    invoke()
    // const acc = new wallet.Account()
//     const publicKey = "03a3355cbb112391ec05231490ddcbd0aec31f018de18fb03440ff65e76f4710f8"
// const account = Neon.create.account(publicKey)
// console.log("add",account.address)
    // console.log("n",acc)
    // wcSdk.manageSession()
    // .then(()=>{console.log("acd")})
    // console.log("abv")
  };




  return (
    <div className="mx-5 my-5">
      <div className="relative rounded-lg px-5 py-3 [background:linear-gradient(rgba(0,_0,_0,_0.14),_rgba(0,_0,_0,_0.14)),_linear-gradient(-38.77deg,_rgba(191,_191,_191,_0.06),_rgba(0,_0,_0,_0))] shadow-[-8px_4px_5px_rgba(0,_0,_0,_0.24)] [backdrop-filter:blur(53px)] w-full h-52 font-poppins">
        <div className='relative flex  items-center justify-between'>
          <b className="text-[1.75rem] text-white text-left">
            My Wallet
          </b>
          <button
            className="flex justify-center items-center relative h-75 w-200 rounded-full bg-[#6851FF]"
            onClick={handleConnectWallet}
          >
            <div className="absolute inset-0 bg-opacity-0 bg-white rounded-full border border-solid border-[#6851FF]"></div>
            <span className="text-base font-medium text-white z-10 px-8 py-3">
              +Add Wallet
            </span>
          </button>
        </div>
      </div>
      <div className="mt-10 rounded-lg bg-[#242333] py-10 px-20">
        <div className='h-20 text-white'>
            Wallet Activity
        </div>
        <TxnActivity/>
      </div>
    </div>
  )
}
