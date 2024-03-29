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
      const contractAddress = 'DUMMY_CONTRACT_ADDRESS'; 
      const contractAbi = ['DUMMY_CONTRACT_ABI']; 
      const contract = new ethers.Contract(contractAddress, contractAbi, library.getSigner());

      const recipients = ['0xRecipientAddress1', '0xRecipientAddress2']; 

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
