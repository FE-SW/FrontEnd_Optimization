import React, { useEffect, useState } from "react";
import video from "../assets/banner-video.mp4";
import FontFaceObserver from "fontfaceobserver";

function BannerVideo() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const font = new FontFaceObserver("BMYEONSUNG"); //폰트가 로드되는 시점을 catch (에니메이션위해)

  useEffect(() => {
    font.load().then(function () {
      setIsFontLoaded(true);
    });
  }, []);

  return (
    <div className="BannerVideo w-full h-screen overflow-hidden relative bg-texture">
      <div className="absolute h-screen w-full left-1/2">
        {/*webm지원하는 브라우저면 webm를 적용하고 아니면 mp4 확장자 적용 */}
        <video
          className="absolute translateX--1/2 h-screen max-w-none min-w-screen -z-1 bg-black min-w-full min-h-screen"
          autoPlay
          loop
          muted
        >
          <source data-srcset={video} type="video/webm" />{" "}
          <source data-srcset={video} type="video/mp4" />{" "}
        </video>
      </div>
      <div
        className="w-full h-full flex justify-center items-center"
        style={{
          opacity: isFontLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div className="text-white text-center">
          <div className="text-6xl leading-none font-semibold">KEEP</div>
          <div className="text-6xl leading-none font-semibold">CALM</div>
          <div className="text-3xl leading-loose">AND</div>
          <div className="text-6xl leading-none font-semibold">RIDE</div>
          <div className="text-5xl leading-tight font-semibold">LONGBOARD</div>
        </div>
      </div>
    </div>
  );
}

export default BannerVideo;
