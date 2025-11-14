import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const baseUrl = '';

export default function DocImage({ folder = 'images/start-guide', name, alt = '', className = '', ...props }) {
  const [open, setOpen] = useState(false);
  const imageUrl = `${baseUrl}/${folder}/${name}`;

  return (
    <>
      <img
        src={imageUrl}
        alt={alt}
        className={className}
        style={{ cursor: 'pointer', maxWidth: '100%' }}
        onClick={() => setOpen(true)}
        {...props}
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: imageUrl, alt }]}
      />
    </>
  );
}
