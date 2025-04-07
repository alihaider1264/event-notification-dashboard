import React from 'react';

interface BannerProps {
  message: string;
}

const Banner: React.FC<BannerProps> = ({ message }) => {
  return (
    <div className="bg-orange-500 text-white p-4 rounded-md">
      {message}
    </div>
  );
};

export default Banner;