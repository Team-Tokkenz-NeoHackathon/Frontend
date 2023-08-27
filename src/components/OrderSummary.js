import React, { useState } from "react";
import Web3 from "web3";
import axios from "axios";
import bg from '../assets/order-bg.png'

export default function OrderSummary(props) {
  // const [seatType, setSeatType] = useState({
  //   budget:0,
  //   elite:0
  // });
  const seats = props.seats;
  const convenience = seats.length * 49;
  const seatType = {
    budget: 0,
    elite: 0,
  };

  seats.forEach((seat) => {
    console.log("abcd", seat.slice(0, 1));
    const row = seat.slice(0, 1);
    if (row === "K" || row === "L") {
      // setSeatType(seatType.elite+1)
      seatType.elite += 1;
    } else {
      // setSeatType(seatType.budget+1)
      seatType.budget += 1;
    }
  });
  const seatPrice = seatType.elite * 350 + seatType.budget * 250;
  const taxes = ((seatPrice + convenience) * 0.15).toFixed(2);
  const total = Number(seatPrice) + Number(convenience) + Number(taxes);
  console.log(seatType, seatPrice);

  const handleOrder = async() =>{
    // let ticketIds=[]
    // props.seats.forEach((seat)=>{
    //   let ticket = `${props.movie}_${props.theatre}_${seat}`
    //   ticketIds.push(ticket)
    // })
    const tickets = {
      movie:props.movie,
      theatre:props.theatre,
      seats:seats
    }
    console.log("or", tickets) //***

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
            // setAddress(userWalletAddress);
            console.log("User Wallet Address:", userWalletAddress); //***

            //TEST DECREAMENT TO 5%
            const dec = total *0.05
            const dollar = dec *0.012
            const gas = dollar / 2.43
            console.log("dec",gas) //***

            const token =  JSON.parse(x).token
            axios({
              method: "post",
              // url: "https://flexpass-back.onrender.com/user/login",
              url: `http://127.0.0.1:8000/user/addAddress/${userWalletAddress}`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then(function (response) {
                console("added to db",response);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install Metamask");
    }
  }

  return (
    <div className="rounded-xl flex justify-center">
      <img className="object-cover" src={bg} alt="" />
      <div className="absolute items-center justify-center z-10">
        <div className="flex flex-col justify-between py-12">
          <div className="flex flex-col justify-between h-full font-poppins text-white">
            <div className="text-4xl items-center font-semibold">ORDER SUMMARY</div>
            <hr className="border-1 bg-gray-300 h-px my-4" />
            <div className="flex justify-between items-center">
              <div className="text-2xl font-medium">SELECTED SEATS :</div>
              <div className="text-2xl font-base flex items-center">
                <div className="text-base text-dimgray-200">({seats.length})</div>
                <div className="ml-1">
                  (
                  {seats.map((seat, index) => {
                    if (index < seats.length - 1) {
                      return `${seat}, `;
                    } else {
                      return `${seat}`;
                    }
                  })}
                  )
                </div>
              </div>
            </div>
            <hr className="border-1 bg-gray-300 h-px my-4" />
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-medium">SUBTOTAL :</div>
                  <div className="text-2xl font-base flex items-center">
                    <div className="text-base text-dimgray-200">
                      ({seatType.budget > 0 ? `${seatType.budget}*250` : ""}
                      {seatType.budget === 0 || seatType.elite === 0 ? " " : " +  "}
                      {seatType.elite > 0 ? `${seatType.elite}*350` : ""})
                    </div>
                    <div className="ml-1">{seatPrice}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-medium">CONVENIENCE FEE :</div>
                  <div className="text-2xl font-base flex items-center">
                    <div className="text-base text-dimgray-200">
                      (49*{props.seats.length})
                    </div>
                    <div className="ml-1">{convenience}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-medium">TAXES :</div>
                  <div className="text-2xl font-base flex items-center">
                    <div className="text-base text-dimgray-200">(15%)</div>
                    <div className="ml-1">{taxes}</div>
                  </div>
                </div>
              </div>
              <hr className="border-1 bg-gray-300 h-px my-2" />
              <div className="flex font-base text-2xl justify-between">
                <div className="font-medium">ORDER TOTAL :</div>
                <div className="font-base">{total}</div>
              </div>

              <hr className="border-1 bg-gray-300 h-px my-4" />
              <div className="flex items-center justify-center w-2/5 m-auto">
                <div className=" rounded-xl [background:linear-gradient(90.57deg,#628eff,#8740cd_53.13%,#580475)] w-full py-2 mb-2 " onClick={handleOrder}>
                  <div className=" py-1 text-center text-5xl font-semibold cursor-pointer">
                    Place Order
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
