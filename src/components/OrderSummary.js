import React from "react";
import axios from "axios";
import bg from "../assets/order-bg.png";
import { u, wallet, rpc, tx, sc } from "@cityofzion/neon-js";

const flexcon1 = require("../flexcon1.json");



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
            console.log('No provider available.');y
            
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

initDapi();


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

  const sendNeo = async (fromAddress, toAddress, amount) => {
    try {
      const privateKey = "KyvkFtwVYU5hAAnjt4SNMtgXxhMidHEm2WGe4HwgKZsbxMHbT4Rc"; // Replace with your private key
      const account = new wallet.Account(privateKey);

      const config = {
        net: "TestNet", // Change to "MainNet" if needed
        account,
      };

      const rpcClient = new rpc.RPCClient(config.net);

      const tx = new tx.Transaction(config.net);
      tx.addOutput(new tx.TransactionOutput({
        assetId: u.reverseHex(u.ASSET_ID.GAS),
        value: u.fixed82num(amount),
        scriptHash: wallet.getScriptHashFromAddress(toAddress),
      }));

      const response = await rpcClient.sendRawTransaction(tx);

      if (response.result) {
        console.log("Transaction sent successfully:", response.result);
      } else {
        console.error("Transaction failed:", response.error);
      }
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
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
                  className=" rounded-xl [back  ground:linear-gradient(90.57deg,#628eff,#8740cd_53.13%,#580475)] w-full py-2 mb-2 ">
                  <div className=" py-1 text-center text-5xl font-semibold cursor-pointer">
                    <button onClick={invoke()}>Place Order</button>
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
