export enum ESolanaChains {
  Mainnet = '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  Devnet = 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
  Testnet = '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z',
}

const solana = {
  chainId: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  name: 'Solana',
  currency: 'SOL',
  explorerUrl: 'https://solscan.io',
  rpcUrl: 'https://rpc.walletconnect.com/v1',
};

const solanaTestnet = {
  chainId: '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z',
  name: 'Solana Testnet',
  currency: 'SOL',
  explorerUrl: 'https://explorer.solana.com/?cluster=testnet',
  rpcUrl: 'https://api.testnet.solana.com',
};

const solanaDevnet = {
  chainId: 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
  name: 'Solana Devnet',
  currency: 'SOL',
  explorerUrl: 'https://explorer.solana.com/?cluster=devnet',
  rpcUrl: 'https://api.devnet.solana.com',
};

export const SolanaChains = {
  MAINNET: solana,
  TESTNET: solanaTestnet,
  DEVNET: solanaDevnet,
};
