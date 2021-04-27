import QRCode from 'qrcode';
import React from 'react';

export default function newForm(props: any) {
  const renderCanvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  function submit(ev: React.FormEvent<EventTarget>) {
    console.log({ ev });
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
    {});

    console.log(data);

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

            <button className="btn bg-blue-700 border border-blue-500 rounded m-4 h-16 text-white font-medium">
              Submit
            </button>
          </fieldset>
        </form>

        <canvas ref={renderCanvasRef}></canvas>
      </main>
    </div>
  );
}
