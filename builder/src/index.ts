import * as dotenv from 'dotenv';
import { generateCertificate } from './certificateBuilder';

dotenv.config();

const certificateRequest = JSON.parse(process.argv[2]);

generateCertificate(certificateRequest);
