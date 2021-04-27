import jsQR from 'jsqr';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Scan(props: any) {
  const videoRef: React.RefObject<HTMLVideoElement> = React.createRef();
  const canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  const router = useRouter();
  const [isScanModeEnabled, enableScanMode] = useState(false);
  const [scannedData, setScannedData] = useState();

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
          console.log({ data: JSON.parse(code.data) });

          setScannedData(JSON.parse(code.data));

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
      <button onClick={() => router.back()}>Back</button>
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

        {scannedData && <pre>{JSON.stringify(scannedData, null, 2)}</pre>}
      </main>
    </div>
  );
}
