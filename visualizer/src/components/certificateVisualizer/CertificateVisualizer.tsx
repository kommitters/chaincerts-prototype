import React, { useEffect, useRef } from 'react';
import { CertificateCanvas } from './three';
import { ICertificate } from './interfaces';

type CertificateVisualizerProps = {
  certificate: ICertificate;
  id: string;
};

const thisCertificateShowing = (id: string) => {
  const actualSlide = window.location.hash.replace('#slide', '');
  return actualSlide == id.replace('certificate-', '');
};

const CertificateVisualizer = ({ certificate, id }: CertificateVisualizerProps) => {
  const certificateCanvasRef = useRef({} as CertificateCanvas);
  const showing = thisCertificateShowing(id);

  useEffect(() => {
    certificateCanvasRef.current = loadCertificateCanvas();

    return () => {
      certificateCanvasRef.current.stop();
    };
  }, []);

  useEffect(() => {
    if (showing) {
      const actualCanvasWidth = document.getElementById(id)!.offsetWidth;

      certificateCanvasRef.current.restartCamaraPosition(actualCanvasWidth);
    }
  }, [showing]);

  const loadCertificateCanvas = () => {
    const container = document.getElementById(id)!;
    container.innerHTML = '';
    const certificateCanvas = new CertificateCanvas(container, certificate);
    certificateCanvas.start();

    return certificateCanvas;
  };

  return <div id={id} className="w-full h-full" />;
};

export default CertificateVisualizer;
