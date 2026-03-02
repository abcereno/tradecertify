// src/components/AlertBanner.tsx
import React from 'react';
import { useGtagConversion } from "@/hooks/useGtagConversion";
import { AlertCircle } from "lucide-react";

const AlertBanner: React.FC = () => {
  const { triggerConversion } = useGtagConversion();

  return (
    <div className="bg-red-600 text-white px-4 py-3 text-center sm:px-6 lg:px-8 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm sm:text-base font-medium">
          Affected by cancelled qualifications? We can help you get back on track. Dial{' '}
          <a
            href="tel:1300403081"
            onClick={(e) => {
              e.preventDefault();
              triggerConversion("tel:1300403081");
            }}
            className="font-bold underline underline-offset-2 hover:text-red-100 transition-colors"
          >
            1300 403 081
          </a>
        </p>
      </div>
    </div>
  );
};

export default AlertBanner;