import { useEffect, useState } from 'react';

const ChatWidgetLoader = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // This function will be called only once after the first user interaction
    const loadScript = () => {
      // Prevent the script from being loaded more than once
      if (hasLoaded) {
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://widgets.leadconnectorhq.com/loader.js';
      script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
      script.setAttribute('data-widget-id', '68ba459e0b6876337913f8c6');
      script.defer = true;
      document.body.appendChild(script);

      setHasLoaded(true);

      // Clean up the event listeners once the script is loaded
      window.removeEventListener('scroll', loadScript);
      window.removeEventListener('mousemove', loadScript);
      window.removeEventListener('touchstart', loadScript);
    };

    // Add event listeners for the first interaction
    window.addEventListener('scroll', loadScript, { once: true });
    window.addEventListener('mousemove', loadScript, { once: true });
    window.addEventListener('touchstart', loadScript, { once: true });

    // Cleanup function in case the component unmounts before interaction
    return () => {
      window.removeEventListener('scroll', loadScript);
      window.removeEventListener('mousemove', loadScript);
      window.removeEventListener('touchstart', loadScript);
    };
  }, [hasLoaded]);

  // This component renders nothing itself
  return null;
};

export default ChatWidgetLoader;