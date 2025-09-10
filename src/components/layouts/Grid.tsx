// src/components/layout/Grid.tsx
import React from "react";

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

export const Row: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`flex flex-wrap -mx-2 ${className}`}>{children}</div>
);

interface ColProps {
  children: React.ReactNode;
  className?: string;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export const Col: React.FC<ColProps> = ({ children, className = "", sm, md, lg, xl }) => {
  const makeWidth = (span?: number, bp?: string) =>
    span ? (bp ? `${bp}:w-${span}/12` : `w-${span}/12`) : "";

  const classes = [
    "px-2",
    makeWidth(sm, "sm"),
    makeWidth(md, "md"),
    makeWidth(lg, "lg"),
    makeWidth(xl, "xl"),
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={`${classes} ${className}`}>{children}</div>;
};
