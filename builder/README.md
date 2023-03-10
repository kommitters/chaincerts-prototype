<p align="center">
  <a href="https://kommit.co">
    <img  src="https://user-images.githubusercontent.com/2568221/222775281-f9528c19-9eb5-48c3-85ac-ff5bede8cab7.png"  alt="Chaincerts Prototype" />
  </a>
</p>

<h1 align="center">
  Chaincerts Builder
</h1>

#### This project generates and distributes virtual certificates based on the Souldbound Token - SBT concept. When a certificate request is received, the project creates the certificate, uploads it to the IPFS storage platform Filebase, and creates an SBT on the Stellar network representing the certificate's delivery to the recipient.

# โ๏ธ Prerequisites

Before running Chaincerts Builder, make sure you have:

- Node.js (Version: 18.13.0)

To install the tools/runtime for the project, run:

- `asdf install`

You can install asdf [here](https://asdf-vm.com/guide/getting-started.html)

# ๐ง๐ปโ๐ป Development

To get started with development, run the following commands:

- `yarn install`: Install dependencies
- `yarn dev`: Runs the project and restarts with each change
- `yarn build`: Generate production build

# ๐งช Testing

To run unit tests with Jest, use:
- `yarn test`

To run unit tests with Jest in silent mode (without console.logs), use:
- `yarn test-silent`

# ๐ฆ Linting

To run the linter, use:

- `yarn lint`

To fix lint issues, use:

- `yarn lint-fix`

# ๐ How to generate your certificate

To obtain a certificate, please provide the following information: the beneficiary's full name,  the type of certificate requested, and the certificate date.

## Available params:

- `username`: The beneficiary's name.
- `certType`: Certificate type you want to generate. Currently, the only available option is `CERTEXAMPLE`.
- `certDate`: The date on which the certificate is issued.


### Setting up a Filebase Account
Before proceeding with the certificate creation process, you need to create a Filebase account to configure the environment file.

To set up a Filebase account, follow these steps:

1. Go to https://filebase.com.
2. Click on the "Try for Free" button to create your account.
3. Complete the sign-up form and verify your account through email.
4. Log in to your account and create a bucket with a unique name to start uploading your files.
5. Navigate to the Access Keys section to retrieve your Access Key and Secret.
6. In the root of the builder project, create an environment file by copying the example file: cp .env.example .env.
7. In the environment file, replace IPFS_ACCESS_KEY_ID with the provided Access Key and IPFS_SECRET_ACCESS_KEY with the provided Secret.
8. Replace IPFS_CERTS_BUCKET_NAME with a unique name in kebab case (e.g., chaincerts-bucket).
9. With your settings in place, trigger the generation of your SBT to receive your public key for easy validation using the visualizer.

## Generating a certificate

To generate a `CertExample` certificate, run the following command:

```bash
yarn generate-cert '{"username": "Chaincerts","certDate": "2023-03-08", "certType": "CERTEXAMPLE"}'
```

After executing the command, you should be able to get a output like this:

![image](https://user-images.githubusercontent.com/84339390/224176280-00055faa-9e68-4996-b82c-89d417a6cf3f.png)
