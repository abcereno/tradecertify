import React from 'react';

// The Fix: Changed from an empty interface to a direct type alias.
type FiveStarsProps = React.SVGProps<SVGSVGElement>;

const FiveStars: React.FC<FiveStarsProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="24"
      viewBox="0 0 120 24"
      aria-label="5 out of 5 stars rating"
      {...props}
    >
      <defs>
        <path
          id="star"
          d="M12 .587l3.668 7.431 8.212 1.193-5.942 5.79.402 8.18L12 18.897l-7.34 3.284.402-8.18-5.942-5.79 8.212-1.193z"
        />
      </defs>
      <use href="#star" x="0" y="0" fill="currentColor" />
      <use href="#star" x="24" y="0" fill="currentColor" />
      <use href="#star" x="48" y="0" fill="currentColor" />
      <use href="#star" x="72" y="0" fill="currentColor" />
      <use href="#star" x="96" y="0" fill="currentColor" />
    </svg>
  );
};

export default FiveStars;