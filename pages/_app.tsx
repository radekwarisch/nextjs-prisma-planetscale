import { ThirdwebProvider } from "@3rdweb/react";
import { ChakraProvider } from "@chakra-ui/react";

/**
 * @description
 * ETH Rinkeby
 */
const supportedChainIds = [4];

/**
 * @description
 * Metamask, WalletConnect
 */
const connectors = {
  injected: {},
  walletconnect: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
