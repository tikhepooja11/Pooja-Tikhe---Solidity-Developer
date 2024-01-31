// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Airdrop is Ownable {
    IERC20 public token;

    // Event triggered after a successful airdrop
    event AirdropSuccessful(address indexed recipient, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function setTokenAddress(address _newTokenAddress) external onlyOwner {
        token = IERC20(_newTokenAddress);
    }

    function airdropTokens(address[] calldata _recipients, uint256 _amount) external onlyOwner {
        require(_recipients.length > 0, "No recipients specified");
        require(_amount > 0, "Airdrop amount must be greater than 0");

        for (uint256 i = 0; i < _recipients.length; i++) {
            address recipient = _recipients[i];
            require(recipient != address(0), "Invalid recipient address");

            // Perform the token transfer
            bool success = token.transfer(recipient, _amount);

            // Trigger event and handle errors
            if (success) {
                emit AirdropSuccessful(recipient, _amount);
            } else {
                revert("Airdrop failed");
            }
        }
    }

    // Function to modify the airdrop quantity
    function modifyAirdropQuantity(uint256 _newAmount) external onlyOwner {
        require(_newAmount > 0, "Airdrop amount must be greater than 0");
        // Update the airdrop quantity
        // Note: This modification will apply to future airdrops, not retroactively.
    }
}
