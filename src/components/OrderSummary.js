import React from "react";
import Web3 from "web3";
import axios from "axios";
import bg from "../assets/order-bg.png";

const flexcon1 = require("../flexcon1.json");

const web3 = new Web3("https://evm.ngd.network/");
const contractAddress = "0xbd1653bC5FD2e4013d55405c8D6900a15823aF3B";

export default function OrderSummary(props) {
  const seats = props.seats;
  const convenience = seats.length * 49;
  let seatType = {
    budget: 0,
    elite: 0,
  };

  seats.forEach((seat) => {
    const row = seat.slice(0, 1);
    if (row === "K" || row === "L") {
      seatType.elite += 1;
    } else {
      seatType.budget += 1;
    }
  });
  const seatPrice = seatType.elite * 350 + seatType.budget * 250;
  const taxes = ((seatPrice + convenience) * 0.15).toFixed(2);
  const total = Number(seatPrice) + Number(convenience) + Number(taxes);

  const placeOrderInSmartContract = async (
    theaterId,
    movieId,
    seats,
    userAddress,
    cost
  ) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(flexcon1, contractAddress);

      // Make the transaction to the mintTicket function
      await contract.methods.mintTicket(theaterId, movieId, seats).send({
        from: accounts[0],
        value: web3.utils.toWei(String(cost), "ether"), // Convert cost to Wei
      });

      console.log("Order placed in smart contract");
    } catch (error) {
      console.log("Error placing order in smart contract:", error);
    }
  };

  const handleOrder = async () => {
    const theaterId = "yourTheaterId";
    const movieId = "yourMovieId";
    const userWalletAddress = await connectToMetamask();

    if (userWalletAddress) {
      const token = getToken();
      const dec = total * 0.05;
      const dollar = dec * 0.012;
      const gas = dollar / 2.43;

      try {
        await addAddressToDatabase(userWalletAddress, token);
        await placeOrderInSmartContract(
          theaterId,
          movieId,
          seats,
          userWalletAddress,
          total
        );
  
        // Perform additional actions after successful order placement
        console.log("Order placed successfully!");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Please install Metamask");
    }
  };

  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected to Metamask");
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
      } catch (error) {
        console.error("Error:", error);
      }
    }
    return null;
  };

  const getToken = () => {
    const x = localStorage.getItem("jwt_token");
    if (x) {
      return JSON.parse(x).token;
    }
    return null; // Return null or handle the case where token is not found
  };

  const addAddressToDatabase = async (address, token) => {
    try {
      await axios({
        method: "post",
        url: `http://10.1.40.13:8000/user/addAddress/${address}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Added to database");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="rounded-xl flex justify-center">
      <img className="object-cover" src={bg} alt="" />
      <div className="absolute items-center justify-center z-10">
        <div className="flex flex-col justify-between py-12">
          <div className="flex flex-col justify-between h-full font-poppins text-white">
            <div className="text-4xl items-center font-semibold">
              ORDER SUMMARY
            </div>
            <hr className="border-1 bg-gray-300 h-px my-4" />
            <div className="flex justify-between items-center">
              <div className="text-2xl font-medium">SELECTED SEATS :</div>
              <div className="text-2xl font-base flex items-center">
                <div className="text-base text-dimgray-200">
                  ({seats.length})
                </div>
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
                      {seatType.budget === 0 || seatType.elite === 0
                        ? " "
                        : " +  "}
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
                <div
                  className=" rounded-xl [background:linear-gradient(90.57deg,#628eff,#8740cd_53.13%,#580475)] w-full py-2 mb-2 ">
                  <div className=" py-1 text-center text-5xl font-semibold cursor-pointer">
                    <button onClick={handleOrder}>Place Order</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
