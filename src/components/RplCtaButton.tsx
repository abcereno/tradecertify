// src/components/RplCtaButton.tsx
import React from "react";
import { useModal } from "@/components/modal/ModalProvider";
import Form from "@/components/modalcomponents/Form";

type Variant = "primary" | "secondary" | "ghost";
type Size = "lg" | "md" | "sm";

interface RplCtaButtonProps {
  label?: string; // default provided below
  variant?: Variant;
  size?: Size;
  // you can override the default URL per placement
  formSrc?: string;
  title?: string;
  height?: string;
  className?: string;
}

const stylesByVariant: Record<Variant, string> = {
  primary: "bg-[#fdb715] text-[#373b40] hover:bg-[#e0a60d]",
  secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  ghost: "text-[#D19D13] hover:text-[#e0a60d]",
};

const stylesBySize: Record<Size, string> = {
  lg: "text-lg px-8 py-4 rounded-lg",
  md: "text-base px-5 py-3 rounded-lg",
  sm: "text-sm px-3 py-2 rounded-md",
};

const DEFAULT_SRC = "https://api.leadconnectorhq.com/widget/booking/iGWRDTDUJmCmIAUmlNCX";

const RplCtaButton: React.FC<RplCtaButtonProps> = ({
  label = "Start RPL Readiness Check",
  variant = "primary",
  size = "md",
  formSrc = DEFAULT_SRC,
  title = "RPL Readiness Check",
  height = "600px",
  className = "",
}) => {
  const { open } = useModal();

  return (
    <button
      type="button"
      className={`${stylesByVariant[variant]} ${stylesBySize[size]} font-semibold transition-colors ${className}`}
      onClick={() =>
        open(<Form src={formSrc} title={title} height={height} />)
      }
    >
      {label}
    </button>
  );
};

export default RplCtaButton;
