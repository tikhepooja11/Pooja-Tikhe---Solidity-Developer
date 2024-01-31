// AirdropPage.js

import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

const AirdropPage = () => {
  const { active, account, library } = useWeb3React();
  const [airdropResult, setAirdropResult] = useState('');

  const handleAirdrop = async () => {
    if (!active) {
      alert('Please connect your MetaMask wallet to BSC TestNet');
      return;
    }

    try {
      const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address
      const contractAbi = ['YOUR_CONTRACT_ABI']; // Replace with your contract ABI
      const contract = new ethers.Contract(contractAddress, contractAbi, library.getSigner());

      const recipients = ['0xRecipientAddress1', '0xRecipientAddress2']; // Replace with actual recipient addresses

      const tx = await contract.airdropTokens(recipients);
      await tx.wait();

      setAirdropResult('Airdrop successful!');
    } catch (error) {
      console.error('Airdrop failed:', error.message);
      setAirdropResult('Airdrop failed');
    }
  };

  useEffect(() => {
    setAirdropResult(''); // Clear result on component mount
  }, []);

  return (
    <div>
      <h1>Airdrop Page</h1>
      <button onClick={handleAirdrop}>Trigger Airdrop</button>
      {airdropResult && <p>{airdropResult}</p>}
    </div>
  );
};

export default AirdropPage;
