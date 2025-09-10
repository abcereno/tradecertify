import React, { useEffect } from "react";

interface FormProps {
  src: string;
  title?: string;
  height?: string;
}

const Form: React.FC<FormProps> = ({ src, title = "Form", height = "600px" }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full max-h-[90vh] overflow-y-auto rounded-lg border">
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        frameBorder="0"
        allowFullScreen
        className="w-full"
        id="hMCYKu5d6Ir83sjyduPH"
        scrolling="no"
      />
    </div>
  );
};

export default Form;
