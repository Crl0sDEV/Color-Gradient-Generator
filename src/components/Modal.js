import React from 'react';

const Modal = ({
  isOpen,
  onClose,
  onDownload,
  width,
  height,
  setWidth,
  setHeight,
  orientation,
  setOrientation
}) => {
  if (!isOpen) return null;

  const handleOrientationChange = (e) => {
    setOrientation(e.target.value);
    if (e.target.value === 'portrait') {
      setWidth(600);
      setHeight(800);
    } else {
      setWidth(800);
      setHeight(600);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Download Options</h2>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="width">Width:</label>
            <input
              type="number"
              id="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="height">Height:</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="orientation">Orientation:</label>
            <select
              id="orientation"
              value={orientation}
              onChange={handleOrientationChange}
              className="p-2 border rounded"
            >
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} className="p-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={onDownload} className="p-2 bg-blue-500 text-white rounded">Download</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
