import { createSBT } from './stellar/index';
import * as dotenv from 'dotenv';

dotenv.config();

const cid = 'QmdtyfTYbVS3K9iYqBPjXxn4mbB7aBvEjYGzYWnzRcMrEC';
createSBT(cid);
