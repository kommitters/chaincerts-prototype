<p align="center">
  <a href="https://kommit.co">
    <img src="https://user-images.githubusercontent.com/84339390/219978514-ed0cc873-a9d5-4007-922d-ba6ead5c9206.png" width="700px" alt="kommit logo"/>
  </a>
</p>

<h1 align="center">
  Chaincerts Builder
</h1>

### This project generates and distributes virtual certificates based on the Souldbound Token - SBT concept. When a certificate request is received, the project creates the certificate, uploads it to the IPFS storage platform Filebase, and creates an SBT on the Stellar network representing the certificate's delivery to the beneficiary.

## ⚒️ Setup Node.js

- `asdf install`: Install current tools/runtime for the project

You can install asdf [here](https://asdf-vm.com/guide/getting-started.html)


## 🚀 Run the app

- `yarn install`: Install dependencies
- `cp .env.example .env`: Create the environment variables file based on the example template
- `yarn dev`: Runs the project and restarts with each change
- `yarn build`: Generate production build
- `yarn generateCert {certificateRequest}`: Generate certificate from a certificate request

## 🧪 Testing

- `yarn test`: Run unit tests with Jest

## 🔦 Linting

- `yarn lint`: Run linter
- `yarn lint-fix`: Fix lint issues
