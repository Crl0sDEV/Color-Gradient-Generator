import React, { useState } from 'react';
import { toPng, toSvg, toJpeg } from 'html-to-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';

const GradientGenerator = () => {
  const [color1, setColor1] = useState('#ff0000');
  const [color2, setColor2] = useState('#0000ff');
  const [direction, setDirection] = useState('to right');

  const gradientStyle = {
    background: `linear-gradient(${direction}, ${color1}, ${color2})`,
  };

  const gradientCSS = `background: linear-gradient(${direction}, ${color1}, ${color2});`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gradientCSS).then(() => {
      alert('CSS code copied to clipboard!');
    });
  };

  const downloadImage = (type) => {
    const node = document.getElementById('gradient-preview');
    let toImage;
    switch (type) {
      case 'png':
        toImage = toPng;
        break;
      case 'svg':
        toImage = toSvg;
        break;
      case 'jpeg':
        toImage = toJpeg;
        break;
      default:
        return;
    }

    toImage(node)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `gradient.${type}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to download image', err);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Gradient Background Generator</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="color1">Color 1:</label>
            <input
              type="color"
              id="color1"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="color2">Color 2:</label>
            <input
              type="color"
              id="color2"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="direction">Direction:</label>
            <select
              id="direction"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="to right">To Right</option>
              <option value="to left">To Left</option>
              <option value="to top">To Top</option>
              <option value="to bottom">To Bottom</option>
              <option value="to top right">To Top Right</option>
              <option value="to bottom right">To Bottom Right</option>
              <option value="to top left">To Top Left</option>
              <option value="to bottom left">To Bottom Left</option>
            </select>
          </div>
        </div>
        <div
          id="gradient-preview"
          className="h-64 rounded shadow-lg"
          style={gradientStyle}
        ></div>
        <div className="flex flex-col space-y-2">
          <label>CSS Code:</label>
          <textarea
            readOnly
            value={gradientCSS}
            className="p-2 border rounded h-16"
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={copyToClipboard}
            className="p-2 bg-blue-500 text-white rounded flex items-center"
          >
            <FontAwesomeIcon icon={faCopy} className="mr-2" />
            Copy CSS
          </button>
          <div className="flex space-x-4">
            <button
              onClick={() => downloadImage('png')}
              className="p-2 bg-green-500 text-white rounded flex items-center"
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              PNG
            </button>
            <button
              onClick={() => downloadImage('svg')}
              className="p-2 bg-purple-500 text-white rounded flex items-center"
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              SVG
            </button>
            <button
              onClick={() => downloadImage('jpeg')}
              className="p-2 bg-red-500 text-white rounded flex items-center"
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              JPEG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
