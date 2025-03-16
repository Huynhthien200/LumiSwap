// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LumiSwap is ReentrancyGuard {
    address public immutable WSTT;
    mapping(address => uint256) public reserves;

    event Swap(
        address indexed user,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );

    constructor(address _WSTT) {
        WSTT = _WSTT;
    }

    function addLiquidity(address token, uint256 amount) external nonReentrant {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        reserves[token] += amount;
    }

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure returns (uint256) {
        return (amountIn * reserveOut) / (reserveIn + amountIn);
    }

    function swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external nonReentrant {
        uint256 reserveIn = reserves[tokenIn];
        uint256 reserveOut = reserves[tokenOut];
        uint256 amountOut = getAmountOut(amountIn, reserveIn, reserveOut);

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenOut).transfer(msg.sender, amountOut);

        reserves[tokenIn] += amountIn;
        reserves[tokenOut] -= amountOut;

        emit Swap(msg.sender, tokenIn, tokenOut, amountIn, amountOut);
    }
}
