import React, { useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { CertificateCanvas } from './three';
import { Certificate } from './interfaces';

const propTypes = {
  certificate: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

const CertificateVisualizer = ({ certificate, id }: InferProps<typeof propTypes>) => {
  useEffect(() => {
    loadCertificate();
  }, []);

  const loadCertificate = () => {
    const container = document.getElementById(id)!;
    // the strict mode renders this component twice, so, it's needed to restart it
    container.innerHTML = '';

    const world = new CertificateCanvas(container, certificate as Certificate);
    world.start();
  };

  return <div id={id} style={{ width: 900, height: 700 }} />;
};

export default CertificateVisualizer;
