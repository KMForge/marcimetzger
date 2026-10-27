import { useRef, useState } from "react";
import { gallery } from "./data";
import { Eyebrow, Photo } from "./ui";
export default function Gallery() {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const change = (step: number) =>
    setIndex((current) => (current + step + gallery.length) % gallery.length);
  const photo = gallery[index];
  return (
    <section id="gallery" tabIndex={-1} className="section-pad gallery-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>A closer look</Eyebrow>
            <h2>Room to imagine.</h2>
          </div>
          <p>
            Photo gallery
            <br />
            <span className="text-muted">
              Homes, views, and life in the valley.
            </span>
          </p>
        </div>
        <div className="gallery-layout">
          <button
            ref={opener}
            className="gallery-main"
            onClick={() => dialog.current?.showModal()}
            aria-label={`Enlarge photo ${index + 1}: ${photo.alt}`}
          >
            <Photo name={photo.image} alt={photo.alt} />
            <span className="image-expand">
              View full image <span aria-hidden="true">↗</span>
            </span>
          </button>
          <div className="gallery-side">
            <Eyebrow>Pahrump, Nevada</Eyebrow>
            <h3>
              A different
              <br />
              point of view.
            </h3>
            <p>
              Explore the photo gallery, from light-filled interiors to
              wide-open mountain views.
            </p>
            <div className="gallery-controls">
              <button
                className="circle-button"
                aria-label="Previous photo"
                onClick={() => change(-1)}
              >
                ←
              </button>
              <span aria-live="polite" aria-atomic="true">
                {String(index + 1).padStart(2, "0")}{" "}
                <span className="text-muted">/ 07</span>
              </span>
              <button
                className="circle-button"
                aria-label="Next photo"
                onClick={() => change(1)}
              >
                →
              </button>
            </div>
            <p className="gallery-note">
              Gallery photography; not a statement of current listing
              availability.
            </p>
          </div>
        </div>
        <div className="gallery-thumbnails" aria-label="Choose a gallery photo">
          {gallery.map((item, i) => (
            <button
              key={item.image}
              aria-label={`Show photo ${i + 1}: ${item.alt}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <Photo
                name={item.image}
                alt=""
                sizes="(max-width: 639px) 22vw, 110px"
              />
            </button>
          ))}
        </div>
        <dialog
          ref={dialog}
          className="lightbox"
          aria-label="Full-size gallery photograph"
          onClose={() => opener.current?.focus()}
          onClick={(e) => {
            if (e.target === e.currentTarget) dialog.current?.close();
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") change(1);
            if (e.key === "ArrowLeft") change(-1);
          }}
        >
          <div className="lightbox-inner">
            <button
              autoFocus
              className="button button-light lightbox-close"
              onClick={() => dialog.current?.close()}
            >
              Close ×
            </button>
            <Photo name={photo.image} alt={photo.alt} sizes="90vw" />
            <div className="lightbox-controls">
              <button
                className="circle-button"
                aria-label="Previous full-size photo"
                onClick={() => change(-1)}
              >
                ←
              </button>
              <p aria-live="polite">Photo {index + 1} of 7</p>
              <button
                className="circle-button"
                aria-label="Next full-size photo"
                onClick={() => change(1)}
              >
                →
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </section>
  );
}
