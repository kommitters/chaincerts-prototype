<p align="center">
  <a href="https://kommit.co">
    <img src="https://user-images.githubusercontent.com/84339390/219978514-ed0cc873-a9d5-4007-922d-ba6ead5c9206.png" width="700px" alt="kommit logo"/>
  </a>
</p>

<h1 align="center">
  Chaincerts Builder
</h1>

### This project generates and distributes virtual certificates based on the Souldbound Token - SBT concept. When a certificate request is received, the project creates the certificate, uploads it to the IPFS storage platform Filebase, and creates an SBT on the Stellar network representing the certificate's delivery to the recipient.

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


## Generating a certificate

To generate a `CertExample` certificate, run the following command:

```bash
yarn generate-cert '{"username": "John Doe","certDate": "2022-10-01", "certType": "CertExample"}'
```

After running the command, you should see the following output:

```
Congratulations! Your certificate has been successfully generated. To access it, simply use your Stellar public key on the Chaincerts visualizer at https://demo.chaincerts.co/.
```
