import { Box, Flex, Text } from "@chakra-ui/react";

const NetworkMetadata = (props: {
  icon: React.ComponentType | string;
  chainName: string;
  symbol: string;
  isTestnet: boolean;
}) => {
  const { chainName } = props;
  if (!props || !chainName) {
    return <></>;
  }
  const { icon, symbol, isTestnet } = props;

  const ChainIconElement = icon;
  const iconSize = symbol === "MATIC" ? 5 : 3;

  return (
    <Flex height="40px" gap={2} alignItems="center">
      <Box w={iconSize} h={iconSize}>
        <ChainIconElement />
      </Box>
      <Text>{chainName}</Text>
      {isTestnet && <Text color="grey">(testnet)</Text>}
    </Flex>
  );
};

export default NetworkMetadata;
