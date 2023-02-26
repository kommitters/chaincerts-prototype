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

To generate a certificate, you need to provide some information such as the beneficiary's name, Stellar account, certificate type, and any additional data required for the certificate.

## Available params:

- `username`: the beneficiary's name.
- `stellar-account`: the beneficiary's stellar account.
- `certificate-type`: certificate type you want to generate. Currently, the only available option is "kommit-mentor".
- `data [optional]`: If required, fill in any additional data needed for the certificate. For the "kommit-mentor" certificate type, you must provide the number of mentored hours. If you don't provide this information, the default number of hours will be set to 1000.

## Generating a certificate

To generate a kommit-mentor certificate, run the following command:

```bash
yarn generateCert '{"username": "John Doe","certificate_date": "2022-10-01","stellar_account": "GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB", "certificate_type": "kommit-mentor"}'
```

To generate a kommit-mentor certificate with additional data, use:

```bash
yarn generateCert '{"username": "John Doe","certificate_date": "2022-10-01","stellar_account": "GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB", "certificate_type": "kommit-mentor", "data": {"mentor_hours": 500}}'
```

After running the command, you should see the following output:

```
Congratulations! Your certificate has been successfully generated. To access it, simply use your Stellar public key in the Chaincerts visualizer at https://demo.chaincerts.co/.
```
