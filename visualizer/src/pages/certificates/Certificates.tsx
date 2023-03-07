import { useLocation } from 'react-router-dom';
import { t } from 'i18next';

import Carousel from '../../components/carousel/Carousel';
import CertificateInformation from '../../components/certificateInformation/CertificateInformation';
import { IAssetInformation } from '../../components/assetInformation/interfaces';
import Profile from '../../components/profile';
import Navbar from '../../components/navbar';
import './styles.css';

const Certificates = () => {

  //const { state: certificates } = useLocation();
  //const carouselData: JSX.Element[] = certificates.map((certificate: IAssetInformation, index: number) => (
  //  <CertificateInformation key={index} id={`certificate-${index}`} assetInformation={certificate} />
  //));

  return (
    <div>
      <Navbar />

      <div className="flex flex-row justify-center my-4">
        <div className="alert bg-white-500 lg:basis-3/5 basis-full shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-success flex-shrink-0 w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <h3 className="font-bold">3 Certificates found.</h3>
              <div className="text-xs">{t('certificates.description')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <div className="carousel lg:basis-3/5 basis-full">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="card bg-base-100 shadow-xl w-full">
              <figure>
                <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
              </figure>
              <div className="card-body py-5">
                <div className="card-actions justify-between">
                  <div className="self-center">
                    <h2 className="card-title">Certificate</h2>
                    <p className="text-sm font-light">QmeYayxSe9RHPBCHrm9zbg1qAHbTCGTwWX34oV68JrSPok</p>
                  </div>
                  <div>
                    <label htmlFor="my-modal-3" className="btn btn-primary">Stellar network data</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4"></a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>

          <div id="slide2" className="carousel-item relative w-full">
            <div className="card bg-base-100 shadow-xl w-full">
              <figure>
                <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
              </figure>
              <div className="card-body py-5">
                <div className="card-actions justify-between">
                  <div className="self-center">
                    <h2 className="card-title">Certificate</h2>
                    <p className="text-sm font-light">QmeYayxSe9RHPBCHrm9zbg1qAHbTCGTwWX34oV68JrSPok</p>
                  </div>
                  <div>
                    <label htmlFor="my-modal-3" className="btn btn-primary">Stellar network data</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">❮</a>
              <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
          </div>

          <div id="slide3" className="carousel-item relative w-full">
            <div className="card bg-base-100 shadow-xl w-full">
              <figure>
                <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
              </figure>
              <div className="card-body py-5">
                <div className="card-actions justify-between">
                  <div className="self-center">
                    <h2 className="card-title">Certificate</h2>
                    <p className="text-sm font-light">QmeYayxSe9RHPBCHrm9zbg1qAHbTCGTwWX34oV68JrSPok</p>
                  </div>
                  <div>
                    <label htmlFor="my-modal-3" className="btn btn-primary">Stellar network data</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">❮</a>
              <a href="#slide4" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <div className="card bg-base-100 shadow-xl w-full">
              <figure>
                <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
              </figure>
              <div className="card-body py-5">
                <div className="card-actions justify-between">
                  <div className="self-center">
                    <h2 className="card-title">Certificate</h2>
                    <p className="text-sm font-light">QmeYayxSe9RHPBCHrm9zbg1qAHbTCGTwWX34oV68JrSPok</p>
                  </div>
                  <div>
                    <label htmlFor="my-modal-3" className="btn btn-primary">Stellar network data</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">❮</a>
              <a href="#slide1"></a>
            </div>
          </div>
        </div>
      </div>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Blockchain information:</h3>
          <div className="py-4">
            <p className="text-sm">AssetCode: CERTEXAMPLE</p>
            <p className="text-sm">CertID: QmeYayxSe9RHPBCHrm9zbg1qAHbTCGTwWX34oV68JrSPok</p>
            <p className="text-sm">Issuer: GDASF4FDAENT77JEOZVYFV2EKDVCVH7HZBL3YVD6KILUGZ2KAAHQPOKK</p>
            <p className="text-sm">Destination:GACI2PH7YDMJMJQJLOECDY3VO4TIOHFEOPYOWQ2MOQL4FASOX3JMPWGZ</p>
            <p className="text-sm">Source:GBN2UYPV2H3CBSESTMW5NIE5X5344MGS5Q2MTK2NI3X6ENC7MIXVAZLX</p>
            <p className="text-sm">Authorized to maintain liabilities:</p>
            <p className="text-sm">Clawback enabled:</p>
            <p className="text-sm">Created at:2023-03-06T17:35:58Z</p>
            <p className="text-sm">Amount:0.0000001</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
