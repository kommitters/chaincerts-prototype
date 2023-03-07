import { executeClawback } from './stellar';

const { xdr } = JSON.parse(process.argv[2]);

executeClawback(xdr);
