import { Bridge, BridgeFactory } from "@chainsafe/sygma-contracts";
import { useEffect, useState } from "react";
import { BridgeConfig, EvmBridgeConfig } from "../../../sygmaConfig";

import { getProvider } from "./helpers";

export function useDestinationBridgeHook(
  destinationChainConfig?: BridgeConfig
) {
  const [destinationBridge, setDestinationBridge] = useState<
    Bridge | undefined
  >(undefined);

  useEffect(() => {
    if (destinationBridge) return;
    const provider = getProvider(destinationChainConfig);
    if (destinationChainConfig && provider) {
      const bridge = BridgeFactory.connect(
        (destinationChainConfig as EvmBridgeConfig).bridgeAddress,
        provider
      );
      setDestinationBridge(bridge);
    }
  }, [destinationChainConfig]);

  return destinationBridge;
}
