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

To obtain a certificate, please provide the following information: the beneficiary's full name, the Stellar account, the type of certificate requested, and any other relevant data necessary for the certification process.

## Available params:

- `username`: The beneficiary's name.
- `stellar-account`: The public key of the beneficiary's Stellar account.
- `cert-type`: Certificate type you want to generate. Currently, the only available option is "kommit-mentor".
- `cert-date`: The date on which the certificate is issued.
- `data [optional]`: Providing additional details is necessary for some certificates; otherwise, default information will be used according to their guidelines. For example, the `kommit-mentor` certificate requires the number of mentoring hours. If you do not provide this, the default will be 100 hour.


## Generating a certificate

You can use these accounts for triggering the builder allowing you to generate certificates with them or using custom accounts also.
> **Demo user 1**
>
> GBDPHJ2MGGATU5GQQRZWFWUY2FXTUF4RCRHRTDRE3USGYCHRHME2P7W7
>
> SAB45KB5GUUPQ3L634ZDERF74HZFYM6CUZYLNFXZIP6M5TPFR4SMX5YP

> **Demo user 2**
>
>  GDE76RVEXIYICMKPAE2FTBW5M6HUEQHGYEGRQIMTTRW7MCHCPU6IH2CM
>
>  SCAGQPH5PF4V46LUIKXR75ZBKQ36GIHF4VT3QZZ44E6L3TXZSZMTXG22

> **Demo user 3**
>
>  GCT55X7CU37OIH6SNTSA4LO5CICSDKTKFIFBG4IEKUSYKOKFJKYWYULE
>
>  SB5ISRXPQBYLFKUZ6EUNEIE5U3QCKMM5HJQ2I4ECQ74DJX56GSBDISQG

> **Demo user 4**
>
>  GCT55X7CU37OIH6SNTSA4LO5CICSDKTKFIFBG4IEKUSYKOKFJKYWYULE
>
>  SB5ISRXPQBYLFKUZ6EUNEIE5U3QCKMM5HJQ2I4ECQ74DJX56GSBDISQG

> **Demo user 5**
>
>  GAXTWYOMASBL5N7TSKBUWC45FIMLRAT253GCER2YLKL66IPHBEJIUJOB
>
>  SDXFECNW72YUTA6ZVQ6N2BCFLSCVCQJ64FD4NSO6RPWK2BU27UTVB74H

To generate a kommit-mentor certificate, run the following command:

```bash
yarn generateCert '{"username": "John Doe","cert_date": "2022-10-01","stellar_account": "GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB", "cert_type": "kommit-mentor"}'
```

To generate a kommit-mentor certificate with additional data, use:

```bash
yarn generateCert '{"username": "John Doe","cert_date": "2022-10-01","stellar_account": "GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB", "cert_type": "kommit-mentor", "data": {"mentor_hours": 500}}'
```

After running the command, you should see the following output:

```
Congratulations! Your certificate has been successfully generated. To access it, simply use your Stellar public key on the Chaincerts visualizer at https://demo.chaincerts.co/.
```
