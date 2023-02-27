import { t } from 'i18next';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function MainInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showError, setErrorShow] = useState(false);
  const [errorNotFound, setErrorNotFound] = useState(false);
  const navigate = useNavigate();
  const certificationCode: string = import.meta.env.CHAIN_CERTIFICATION_CODE as string;

  const handleClick = async () => {
    console.log('this is certificate code: ', certificationCode);
    //GB6KONY6F5U3HWSQSPCUX2HJPPENEBP5P77ALW3HPABUHP6YQNZUFZHW
    const publicKey = inputRef.current;
    if (publicKey) {
      try {
        const cids: { id: string; cert: string }[] = [
          { id: '1', cert: '123' },
          { id: '2', cert: '123' },
          { id: '3', cert: '1234' }
        ];
        //console.log(cids);
        if (cids.length !== 0) {
          setErrorShow(false);
          setErrorNotFound(false);
          //send netx page with cids
          navigate('certificates/GB6KONY6F5U3HWSQSPCUX2HJPPENEBP5P77ALW3HPABUHP6YQNZUFZHW', {
            state: cids
          });
        } else {
          setErrorNotFound(true);
        }
      } catch (error) {
        setErrorShow(true);
      }
    }
  };

  const placeholder = t('home.stellar_input.placeholder');

  return (
    <div className="wrapper">
      <div className="main-input-container">
        <input className="main-input" ref={inputRef} type="text" placeholder={placeholder} />
        <button className="button-input" onClick={handleClick}>
          {t('home.stellar_input.enter')}
        </button>
      </div>
      {showError && (
        <div className="error-alert">
          <span>
            <strong>{t('home.stellar_input.error_title')}</strong> {t('home.stellar_input.error_message')}{' '}
          </span>
        </div>
      )}
      {errorNotFound && <div className="error-alert">{t('certificates.carousel.not_found_message')}</div>}
    </div>
  );
}

export default MainInput;
