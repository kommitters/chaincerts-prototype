import { Server } from 'stellar-sdk';

const HORIZON_TESTNET = 'https://horizon-testnet.stellar.org';

export const getStellarServer = () => new Server(HORIZON_TESTNET);
