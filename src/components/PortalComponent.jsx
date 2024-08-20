// PortalComponent.js
import React from 'react';
import ReactDOM from 'react-dom';

const PortalComponent = ({ children, rootId }) => {
  const portalRoot = document.getElementById(rootId);
  return ReactDOM.createPortal(children, portalRoot);
};

export default PortalComponent;