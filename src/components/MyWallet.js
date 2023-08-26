import React,{useState,useEffect} from 'react'

import Web3 from "web3";

 //Check if MetaMask is installed


export default function UserDetails(props) {
  const handleTicket = () => {
    props.setButton(1);
  };

  // const handleConnectWallet = async () => {
  //   console.log("wallet connection")
    // const acc = new wallet.Account()
//     const publicKey = "03a3355cbb112391ec05231490ddcbd0aec31f018de18fb03440ff65e76f4710f8"
// const account = Neon.create.account(publicKey)
// console.log("add",account.address)
    // console.log("n",acc)
    // wcSdk.manageSession()
    // .then(()=>{console.log("acd")})
    // console.log("abv")
  // }
  const handleConnectWallet = async () =>{ 
    if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
  
    // Request account access if needed
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        // Accounts now exposed
        web3.eth.getAccounts((error, accounts) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Connected to MetaMask with account:", accounts[0]);
            // Do something with the connected account
          }
        });
      })
      .catch((error) => {
       console.error(error);
      });
  } else {
    console.error("Please install MetaMask to use this application.");
  }}
  




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
      </div>
    </div>
  )
}
