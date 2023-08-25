import React from 'react'
import { TezosToolkit } from "@taquito/taquito";
import { TempleWallet } from '@temple-wallet/dapp';
import TxnActivity from './TxnActivity';

const Tezos = new TezosToolkit('https://testnet-tezos.giganode.io');

export default function UserDetails(props) {
  const handleTicket = () => {
    props.setButton(1);
  };

  const handleConnectWallet = async () => {
    try {
      const available = await TempleWallet.isAvailable();
      if (!available) {
        console.log("Temple Wallet is not available");
        return;
      }

      const wallet = new TempleWallet("Flexpass");
      await wallet.connect("ghostnet");

      Tezos.setWalletProvider(wallet);

      const pkh = await wallet.getPKH();
      console.log(`Connected with address: ${pkh}`);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
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
            onClick={() => {
              handleConnectWallet()
            }}
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
