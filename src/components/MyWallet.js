import React, { useState } from "react";
import Web3 from "web3";
import axios from "axios";
import { FaCopy } from "react-icons/fa6";
import WalletLog from "./WalletLog";

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
            const token = JSON.parse(x).token
            axios({
              method: "post",
              // url: "https://flexpass-back.onrender.com/user/login",
              url: `https://flexpass-back.onrender.com/user/addAddress/${userWalletAddress}`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              // data: { email: email, password: password.toString() },
            })
              // .then(function (response) {
              //   console(response);
              // })
              // .catch(function (error) {
              //   console.log(error);
              // });
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
    <div className="w-full my-10">
      <div className="flex flex-col">
        <div className="font-poppins font-bold text-white text-[28px] mx-14 mb-8">My Wallet : </div>
        <div className="flex justify-around items-center">
          <div className="relative rounded-[20px] [background:linear-gradient(rgba(0,_0,_0,_0.14),_rgba(0,_0,_0,_0.14)),_linear-gradient(-38.77deg,_rgba(191,_191,_191,_0.06),_rgba(0,_0,_0,_0))] shadow-[-8px_4px_5px_rgba(0,_0,_0,_0.24)] [backdrop-filter:blur(53px)] w-1/2 h-[11rem] text-center text-lg text-white font-montserrat py-6 px-4 ml-12 mr-12">
            <div className="flex flex-col">
              <div className="relative text-3xl montserrat text-white text-left opacity-[0.6] mb-2">Total Balance</div>
              <b className="relative text-21xl font-manrope text-white text-left mb-5">Rs. 1910.00</b>
              <div className="mx-1 my-2">
                <div className="flex items-center justify-around">
                  <div className="relative rounded-[20px] box-border w-3/4 h-6 border-[0.5px] border-solid border-white items-center">
                    <div className="flex justify-around items-center">
                      <div className="relative text-sm overflow-hidden"><FaCopy /></div>
                      <div className="relative text-[0.95rem] font-light font-montserrat text-white text-center">0xfb7b2ad98f9e622b487c582b080cbf4bcfa2b08f</div>
                    </div>
                  </div>
                  <button
                    className="ml-2 flex justify-center items-center relative h-8 w-1/4 rounded-full bg-purple-800"
                    onClick={handleConnectWallet}
                  >
                    <div className="font-medium font-poppins text-white text-center text-base">+Add Money</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-[20px] [background:linear-gradient(rgba(0,_0,_0,_0.14),_rgba(0,_0,_0,_0.14)),_linear-gradient(-38.77deg,_rgba(191,_191,_191,_0.06),_rgba(0,_0,_0,_0))] shadow-[-8px_4px_5px_rgba(0,_0,_0,_0.24)] [backdrop-filter:blur(53px)] w-1/2 h-[11rem] text-center text-lg text-white font-montserrat py-6 px-4 mr-12">
            <div className="flex flex-col">
              <div className="relative text-3xl montserrat text-white text-left opacity-[0.6]">Total Purchase</div>
              <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-center mr-16">
                  <img src='/2.svg' />
                  <div className="relative text-base font-poppins text-white text-center">Resell</div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <img src='/1.svg' />
                  <div className="relative text-base font-poppins text-white text-center">Sold</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="mt-6 mx-12 mb-2 rounded-t-lg">
          <WalletLog />
        </div>
      </div>
    </div>
  );
}