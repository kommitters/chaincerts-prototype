import React, { useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { CertificateCanvas } from './three';
import { ICertificate } from './interfaces';

const propTypes = {
  certificate: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

const CertificateVisualizer = ({ certificate, id }: InferProps<typeof propTypes>) => {
  useEffect(() => {
    const certificateCanvas = loadCertificateCanvas();

    return () => {
      certificateCanvas.stop();
    };
  }, []);

  const loadCertificateCanvas = () => {
    const container = document.getElementById(id)!;
    container.innerHTML = '';

    const certificateCanvas = new CertificateCanvas(container, certificate as ICertificate);
    certificateCanvas.start();

    return certificateCanvas;
  };

  return <div id={id} style={{ width: 900, height: 700 }} />;
};

export default CertificateVisualizer;
