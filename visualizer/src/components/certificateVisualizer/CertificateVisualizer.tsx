import React, { useEffect } from 'react';
import { CertificateCanvas } from './three';
import { ICertificate } from './interfaces';

type CertificateVisualizerProps = {
  certificate: ICertificate;
  id: string;
};

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

  return <div id={id} className="w-full h-full cursor-move" />;
};

export default CertificateVisualizer;
