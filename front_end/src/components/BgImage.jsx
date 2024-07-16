import React from 'react';

const BgImage = () => {
    return (
        <div className="text-white h-[100vh] justify-center items-center" style={{
          backgroundImage: "url('../src/assets/bg.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
          // backgroundAttachment: "fixed"
          }}>
        </div>
    );
};

export default BgImage;