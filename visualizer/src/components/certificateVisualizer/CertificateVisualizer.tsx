import React, { useEffect } from 'react';
import { CertificateCanvas } from './three';
import { ICertificate } from './interfaces';

type CertificateVisualizerProps = {
  certificate: ICertificate;
  id: string;
};

const DEFAULT_COMPONENT_WIDTH = 700;
const DEFAULT_COMPONENT_HEIGHT = 400;

const CertificateVisualizer = ({ certificate, id }: CertificateVisualizerProps) => {
  useEffect(() => {
    const certificateCanvas = loadCertificateCanvas();

    return () => {
      certificateCanvas.stop();
    };
  }, []);

  const loadCertificateCanvas = () => {
    const container = document.getElementById(id)!;
    container.innerHTML = '';

    const certificateCanvas = new CertificateCanvas(container, certificate);
    certificateCanvas.start();

    return certificateCanvas;
  };

  return <div id={id} style={{ width: DEFAULT_COMPONENT_WIDTH, height: DEFAULT_COMPONENT_HEIGHT }} />;
};

export default CertificateVisualizer;
