import profileImg from "../assets/profile-img.jpg";
import React, { useState } from "react";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";




// function handleConnectWallet() {
//   requestPermissions();
// }

export default function UserDetails(props) {


  async function requestPermissions() {
    // try {
    //   console.log("Requesting permissions...");
      // const permissions = await wallet.client.requestPermissions();
    //   console.log("Got permissions:", permissions.address);
    // } catch (error) {
    //   console.log("Got error:", error);
    // }
  }

  const handleTicket = () => {
    props.setButton(1);
  };
  const handleWallet = () => {
    props.setButton(2);
  };
  console.log("log", props.userData);

  return (
    <div className="flex flex-col cursor-pointer text-semibold text-white font-poppins font-semibold justify-center items-center">
      {/* Header */}
      <div className="pt-12 flex flex-col items-center">
        <div className="w-3/5">
          <img className="m-auto rounded-full" src={profileImg} />
        </div>
        <div className="flex flex-col my-5 text-center">
          <div className="text-5xl">{props.userData.name}</div>
          <div className="font-3xl">+91 {props.userData.phone}</div>
        </div>
      </div>
      <div className="flex flex-col items-center my-5">
        <button
          className={`rounded-2xl ${props.button === 2 ? "bg-transparent" : "bg-white"
            } my-5`}
        >
          <div className={`rounded-[10px]  w-48 h-16  ${props.button === 2 ? "text-white" : "text-[#333333]"
            } text-5xl text-center font-noto-sans px-4 py-4`}>
            <div
              className="text-4xl cursor-pointer pb-4 flex justify-around"
              onClick={handleTicket}
            >
              <span className="py-1">
                <BsTicketPerforatedFill color={props.button === 2 ? 'white' : '#333333'} />
              </span>
              <span>Tickets</span>
            </div>
          </div>
        </button>
        <button
          className={`rounded-2xl ${props.button === 1 ? "bg-transparent" : "bg-white"
            } my-5`}
        >
          <div className={`rounded-[10px]  w-48 h-16  ${props.button === 1 ? "text-white" : "text-[#333333]"
            } text-5xl text-center font-noto-sans px-4 py-4`}>
            <div
              className="text-4xl cursor-pointer pb-4 flex justify-around"
              // onClick={handleConnectWallet}
              onClick={handleWallet}
            >
              <span className="py-1">
                <FaWallet color={props.button === 1 ? 'white' : '#333333'} />
              </span>
              <span>Wallet</span>
            </div>
          </div>
        </button>
        {/* <button className="rounded-full bg-blue-900 my-5">
          <div className="rounded-[20px] [background:linear-gradient(-38.77deg,_rgba(191,_191,_191,_0.06),_rgba(0,_0,_0,_0)),_rgba(0,_0,_0,_0.14)] shadow-[-8px_4px_5px_rgba(0,_0,_0,_0.24)] [backdrop-filter:blur(53px)] w-48 h-16  text-white text-5xl text-center font-noto-sans px-4 py-4">
            <div className='text-4xl cursor-pointer pb-4' onClick={handleConnectWallet}>
              Log Out
            </div>
          </div>
        </button> */}
      </div>
    </div>
  );
}
