<p align="center">
  <a href="https://kommit.co">
    <img  src="https://user-images.githubusercontent.com/2568221/222775281-f9528c19-9eb5-48c3-85ac-ff5bede8cab7.png"  alt="Chaincerts Prototype" />
  </a>
</p>

<h1 align="center">
  Chaincerts Builder
</h1>

#### This project generates and distributes virtual certificates based on the Souldbound Token - SBT concept. When a certificate request is received, the project creates the certificate, uploads it to the IPFS storage platform Filebase, and creates an SBT on the Stellar network representing the certificate's delivery to the recipient.

# ⚒️ Prerequisites

Before running Chaincerts Builder, make sure you have:

- Node.js (Version: 18.13.0)

To install the tools/runtime for the project, run:

- `asdf install`

You can install asdf [here](https://asdf-vm.com/guide/getting-started.html)

# 🧑🏻‍💻 Development

To get started with development, run the following commands:

- `yarn install`: Install dependencies
- `yarn dev`: Runs the project and restarts with each change
- `yarn build`: Generate production build

# 🧪 Testing

To run unit tests with Jest, use:
- `yarn test`

To run unit tests with Jest in silent mode (without console.logs), use:
- `yarn test-silent`

# 🔦 Linting

To run the linter, use:

- `yarn lint`

To fix lint issues, use:

- `yarn lint-fix`

# 📜 How to generate your certificate

To obtain a certificate, please provide the following information: the beneficiary's full name,  the type of certificate requested, and the certificate date.

## Available params:

- `username`: The beneficiary's name.
- `certType`: Certificate type you want to generate. Currently, the only available option is `CertExample`.
- `certDate`: The date on which the certificate is issued.

## Pre requisites
* A Filebase account
* A Distributor account
* An Issuer account
* A Destination account

The builder will generate for you all of the required accounts automatically, while it executes the certificate creation process, but you will need to create the Filebase account to configure the environment file.

### Filebase Account
1. Head over to https://filebase.com
2. Click on the Try for Free button to set up your account.
3. Complete the sign-up form and verify your new account via email.
4. Log in and create a bucket with a unique name to begin uploading your files.
5. Navigate to the Access Keys section to retrieve your Access Key and Secret.
    * Replace IPFS_ACCESS_KEY_ID with the provided key on the env file.
    * Replace IPFS_SECRET_ACCESS_KEY with the provided secret on the env file.
6. With your settings in place, proceed to triggering the generation of your SBT and receive your public key for easy validation using the visualizer.


## Generating a certificate

To generate a `CertExample` certificate, run the following command:

```bash
yarn generate-cert '{"username": "John Doe","certDate": "2022-10-01", "certType": "CertExample"}'
```

After running the command, you should see the following output:

```
Congratulations! Your certificate has been successfully generated. To access it, simply use your Stellar public key on the Chaincerts visualizer at https://demo.chaincerts.co/.
```
