import React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  getHTMLElementId: string;
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({
  children,
  getHTMLElementId,
}) => {
  const mount = document.getElementById(getHTMLElementId);
  const el = document.createElement('div');

  React.useEffect(() => {
    if (mount) mount.appendChild(el);
    return () => {
      if (mount) mount.removeChild(el);
    };
  }, [el, mount]);

  if (!mount) return null;
  return createPortal(children, el);
};
