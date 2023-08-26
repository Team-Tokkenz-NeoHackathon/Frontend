import React, { useState } from "react";
import Web3 from "web3";
import axios from "axios";

export default function UserDetails(props) {
  const [active, setActive] = useState(0);
  const [sideBarActive, setSideBarActive] = useState(true);
  const [address, setAddress] = useState();

  const toggleActive = () => {
    setSideBarActive(!sideBarActive);
  };

  const changeActive = (index) => {
    if (index === active) {
      setActive(0);
    } else {
      setActive(index);
    }
  };

  const handleConnectWallet = async () => {
    const x = localStorage.getItem("jwt_token");

    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected to Metamask");
        window.ethereum
          .enable()
          .then(async (accounts) => {
            const userWalletAddress = accounts[0];
            setAddress(userWalletAddress);
            console.log("User Wallet Address:", userWalletAddress);
            const balanceWei = await web3.eth.getBalance(userWalletAddress);
            const balanceEth = web3.utils.fromWei(balanceWei, "ether");
            console.log("Account Balance (Ether):", balanceEth);
            const token =  JSON.parse(x).token
            axios({
              method: "post",
              // url: "https://flexpass-back.onrender.com/user/login",
              url: `http://127.0.0.1:8000/user/addAddress/${userWalletAddress}`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              // data: { email: email, password: password.toString() },
            })
              .then(function (response) {
                console(response);
              })
              .catch(function (error) {
                console.log(error);
              });
            // console.log("ress",data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        // Now you can use the 'web3' instance to interact with the Ethereum network
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install Metamask");
    }
  };

  return (
    <div className="mx-5 my-5">
      <div className="relative rounded-lg px-5 py-3 bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg backdrop-blur-lg w-full h-52 font-poppins">
        <div className="relative flex items-center justify-between">
          <b className="text-2xl text-white text-left">My Wallet</b>
          <button
            className="flex justify-center items-center relative h-12 w-40 rounded-full bg-purple-500"
            onClick={handleConnectWallet}
          >
            <div className="absolute inset-0 bg-opacity-0 bg-white rounded-full border border-solid border-purple-500"></div>
            <span className="text-base font-medium text-white z-10 px-4 py-2">
              {address?address:"+ Add Wallet"}
            </span>
          </button>
        </div>
      </div>
      <div className="mt-10 rounded-lg bg-gray-800 py-10 px-20">
        <div className="h-20 text-white">Wallet Activity</div>
        {/* You can add more wallet activity related components here */}
      </div>
    </div>
  );
}
