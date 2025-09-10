import React, { useEffect } from 'react';

interface BookingProps {
  src: string;
  title?: string;
  height?: string;
}

const Booking: React.FC<BookingProps> = ({ src, title = "Booking", height = "500px" }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full">
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        frameBorder="0"
        allowFullScreen
        className="rounded-lg"
      />
    </div>
  );
};

export default Booking;