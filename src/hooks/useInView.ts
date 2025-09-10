// src/hooks/useInView.ts
import { useState, useEffect, RefObject } from 'react';

interface Options extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

const useInView = (ref: RefObject<HTMLElement>, options?: Options): boolean => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    // Disconnect the observer after it has triggered once
                    if (options?.triggerOnce) {
                        observer.disconnect();
                    }
                }
            },
            {
                root: options?.root,
                rootMargin: options?.rootMargin,
                threshold: options?.threshold ?? 0.1, // Default threshold of 10%
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return isInView;
};

export default useInView;