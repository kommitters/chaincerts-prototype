import { generateCertificate } from './certificateBuilder';

const certificateRequest = JSON.parse(process.argv[2]);

generateCertificate(certificateRequest);
