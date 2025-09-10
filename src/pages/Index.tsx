
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { AppProvider } from '@/contexts/AppContext';
import SEO from "@/SEO";
import { websiteJSONLD, organizationJSONLD, breadcrumbJSONLD } from "@/seo/builders";
const Index: React.FC = () => {
  return (
    <>
            <SEO
        title="Get Qualified via RPL"
        description="Turn on-the-tools experience into nationally recognised qualifications."
        canonical="/"
        type="website"
        jsonLd={[
          websiteJSONLD(),
          organizationJSONLD(),
          breadcrumbJSONLD([{ name: "Home", url: "/" }]),
        ]}
      />
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </>
  );
};

export default Index;
