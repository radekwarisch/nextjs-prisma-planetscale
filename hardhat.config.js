require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { ETH_URL, ETH_KEY } = process.env;

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: ETH_URL,
      accounts: [ETH_KEY],
    },
  },
};
