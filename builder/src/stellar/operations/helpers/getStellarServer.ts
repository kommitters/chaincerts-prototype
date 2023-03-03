import { Server } from 'stellar-sdk';
import { HORIZON_TESTNET } from '../../../resources/consts';

export const getStellarServer = () => new Server(HORIZON_TESTNET);
