import jsQR from 'jsqr';
import React, { useState } from 'react';

export default function Scan(props: any) {
  const videoRef: React.RefObject<HTMLVideoElement> = React.createRef();
  const canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  const [isScanModeEnabled, enableScanMode] = useState(false);

  function onScan() {
    enableScanMode(true);
    const canvasElement: HTMLCanvasElement = canvasRef.current;
    const video: HTMLVideoElement = videoRef.current;
    const canvas = canvasElement.getContext('2d');
    function tick() {
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

      if (canvasElement.width && canvasElement.height) {
        const imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        const code = jsQR(
          imageData.data,
          canvasElement.width,
          canvasElement.height
        );
        if (code) {
          console.log({ code });

          enableScanMode(false);

          const source = video.srcObject as MediaStream;

          source.getTracks().forEach((track) => {
            track.stop();
          });
        } else {
          requestAnimationFrame(tick);
        }
      } else {
        requestAnimationFrame(tick);
      }
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(function (stream) {
        video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
        video.srcObject = stream;
        video.play();
        tick();
      });
  }

  return (
    <div className="container flex flex-col items-center content-center">
      <main className="flex flex-col items-center content-center">
        <h1 className="text-5xl m-5">Scan the thing!</h1>

        <button onClick={onScan} hidden={isScanModeEnabled}>
          Scan
        </button>

        <video style={{ display: 'none' }} ref={videoRef}></video>

        <canvas
          ref={canvasRef}
          style={{ display: isScanModeEnabled ? 'initial' : 'none' }}
        ></canvas>
      </main>
    </div>
  );
}
