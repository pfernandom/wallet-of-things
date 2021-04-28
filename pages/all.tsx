import { useRouter } from 'next/router';
import QRCode from 'qrcode';
import React, { useEffect, useState } from 'react';

type Props = {
  db: PouchDB.Database;
};

export default function All(props: Props): React.ReactElement {
  const [allThings, setAllThings] = useState([]);
  const [isQRVisible, setQRVisible] = useState<boolean>(false);

  const renderCanvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  const exludeColumns = ['_id', '_rev', 'isWalletGenerated'];

  useEffect(() => {
    const all = props.db.allDocs({ include_docs: true });
    all.then((data) => {
      console.log(data.rows);
      setAllThings(data.rows);
    });
  }, []);
  const router = useRouter();

  function onViewQR(doc) {
    console.log({ doc });
    setQRVisible(true);
    QRCode.toCanvas(
      renderCanvasRef.current,
      JSON.stringify(doc),
      function (error) {
        if (error) console.error(error);
        console.log('success!');
      }
    );
  }

  function closeModal(ev) {
    console.log({ ev: ev.target });
    if (ev.target.id === 'qr-modal') {
      setQRVisible(false);
    }
  }

  return (
    <div className="container flex flex-col items-center content-center">
      <button onClick={() => router.back()}>Back</button>
      <main className="flex flex-col">
        <h1 className="text-5xl m-5 col-span-3 self-center">All things!</h1>
        <ul className="col-span-2 lg:col-span-1">
          {allThings
            .map((thing) => thing.doc)
            .map((doc, id) => (
              <li key={id} className="m-4">
                {Object.entries(doc)
                  .filter(([k, v]) => !exludeColumns.includes(k))
                  .map(([k, v], id) => (
                    <span key={id}>
                      <span className="text-green-700">{k}:</span> {v},{' '}
                    </span>
                  ))}
                <button className="btn" onClick={() => onViewQR(doc)}>
                  Share it!
                </button>
              </li>
            ))}
        </ul>

        <div
          id="qr-modal"
          style={{ visibility: isQRVisible ? 'initial' : 'hidden' }}
          className="animated fadeIn fixed top-0 left-0 w-screen h-screen z-40 pin overflow-auto bg-green-500 bg-opacity-50 flex"
          onClick={closeModal}
        >
          <div className="z-50 animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end md:justify-center p-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col items-center">
            <h2 className="text-4xl text-center font-hairline md:leading-loose text-grey md:mt-4 mb-4">
              Copy the thing!
            </h2>{' '}
            <canvas ref={renderCanvasRef}></canvas>
          </div>
        </div>
      </main>
    </div>
  );
}
