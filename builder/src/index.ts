import { generateCertificate } from './certificateBuilder';

const certificateRequest = JSON.parse(process.argv[2]);

const certificate = generateCertificate(certificateRequest);

console.log(certificate);
