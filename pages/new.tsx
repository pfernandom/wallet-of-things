import { useRouter } from 'next/router';
import QRCode from 'qrcode';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function newForm(props: any) {
  props.db.info().then(function (info) {
    console.log(info);
  });

  const router = useRouter();
  const renderCanvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  function submit(ev: React.FormEvent<EventTarget>) {
    const thingGeneratedObject = { _id: uuidv4() };

    const form = ev.target as HTMLFormElement;
    const data = Array.from(form.elements).reduce(function (
      acc: any,
      e: HTMLFormElement
    ) {
      if (e.name) {
        acc[e.name] = e.value;
      }
      return acc;
    },
    thingGeneratedObject);

    const result = props.db.put(data);
    result.then((res) => {
      console.log(res);
    });

    QRCode.toCanvas(
      renderCanvasRef.current,
      JSON.stringify(data),
      function (error) {
        if (error) console.error(error);
        console.log('success!');
      }
    );
    ev.preventDefault();
  }

  return (
    <div className="container flex flex-col items-center content-center">
      <button onClick={() => router.back()}>Back</button>
      <main className="flex flex-col items-center content-center">
        <h1 className="text-5xl m-5">New thing!</h1>

        <form className="flex min-w-full" onSubmit={submit}>
          <fieldset className="flex flex-col min-w-full">
            <label htmlFor="name" className="mb-4 flex flex-col md:flex-row">
              Thing name:
              <input
                id="name"
                name="name"
                type="text"
                className="rounded md:ml-4 min-w-full"
              />
            </label>

            <label
              htmlFor="notes"
              className="flex min-w-full flex-col md:flex-row"
            >
              Thing notes:
              <textarea
                rows={5}
                id="notes"
                name="notes"
                className="rounded md:ml-4 min-w-full"
              />
            </label>

            <button className="btn m-4 h-16">Submit</button>
          </fieldset>
        </form>

        <canvas ref={renderCanvasRef}></canvas>
      </main>
    </div>
  );
}
