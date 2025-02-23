import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-6 w-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);


interface BrandColors {
  primary: string;
  primaryHover: string;
  background: string;
  backgroundHover: string;
  accent: string;
  accentHover: string;
  text: string;
  textMuted: string;
}

interface Brand {
  name: string;
  logo: React.FC<LogoProps>;
  colors: BrandColors;
}

export const BRAND: Brand = {
  name: "CareConnect",
  logo: Logo,
  colors: {
    primary: "text-primary",
    primaryHover: "text-primary/90",
    background: "bg-primary",
    backgroundHover: "bg-primary/90",
    accent: "bg-accent",
    accentHover: "bg-accent/90",
    text: "text-foreground",
    textMuted: "text-muted-foreground"
  }
};