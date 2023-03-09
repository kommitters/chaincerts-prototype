import { ICertificate } from '../interfaces';

export const scfAwardsTemplate: ICertificate = {
  materialFile: 'scf-awards.mtl',
  objectFile: 'scf-awards.obj',
  modelSettings: [
    { name: 'Plane.004', texture: 'kommit_banner.png', visible: true },
    { name: 'Plane.002', texture: 'certificate_background.jpg', visible: true },
    { name: 'Plane.001', texture: '', visible: false }
  ],
  texts: [
    {
      type: 'username',
      textFormatter: '[value]',
      fontSize: 0.017,
      position: { x: 2.5, y: -1.05, z: -0.7 },
      color: '0xffffff',
      bold: true,
      text: ''
    },
    {
      type: 'certSubtitle',
      textFormatter: '[value]',
      fontSize: 0.013,
      position: { x: 2.5, y: -0.5, z: -0.7 },
      color: '0xffffff',
      text: ''
    },
    {
      type: 'stellarAccount',
      textFormatter: 'Stellar Account: [value]',
      fontSize: 0.0063,
      position: { x: 3.0, y: -1.87, z: 0.5 },
      color: '0xffffff',
      vertical: true,
      text: ''
    },
    {
      type: 'certDate',
      textFormatter: '///////[value]',
      fontSize: 0.0149,
      position: { x: 2.5, y: -1.65, z: -0.7 },
      color: '0x2561c3',
      bold: true,
      text: ''
    }
  ]
};
