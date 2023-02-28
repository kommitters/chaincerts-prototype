import { Server } from 'stellar-sdk';
import { HORIZON_TESTNET } from '../../../configs/consts';

export const getStellarServer = () => new Server(HORIZON_TESTNET);
