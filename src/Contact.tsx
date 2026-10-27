import { useRef, useState, type FormEvent } from "react";
import { contact, socials } from "./data";
import { Arrow, Eyebrow } from "./ui";
export default function Contact() {
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const output = useRef<HTMLTextAreaElement>(null);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setDraft(
      `Name: ${String(data.get("name")).trim()}\nEmail: ${String(data.get("email")).trim()}\n\n${String(data.get("message")).trim()}`,
    );
    setStatus(
      "Your draft is ready. Nothing has been sent. Copy it and open Marci’s contact form to send.",
    );
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus(
        "Draft copied. Open Marci’s contact form and paste your message to send.",
      );
    } catch {
      output.current?.focus();
      output.current?.select();
      setStatus(
        "Select and copy the draft below, then open Marci’s contact form.",
      );
    }
  }
  return (
    <section id="contact" tabIndex={-1} className="section-pad contact-section">
      <div className="container">
        <Eyebrow>Let’s move forward</Eyebrow>
        <div className="contact-layout">
          <div>
            <h2>
              Let’s talk
              <br />
              about your next move.
            </h2>
            <p className="contact-intro">
              Marci Metzger — The Ridge Realty Group
            </p>
            <a className="contact-phone" href={contact.tel}>
              {contact.phone} <Arrow diagonal />
            </a>
            <div className="contact-details">
              <div>
                <h3>Call or visit</h3>
                <address>{contact.address}</address>
                <a className="text-link" href={contact.directions}>
                  Get directions <Arrow diagonal />
                </a>
                <a className="text-link block" href={contact.map}>
                  View office on Google Maps <Arrow diagonal />
                </a>
              </div>
              <div>
                <h3>Office hours</h3>
                <p>
                  Open daily
                  <br />
                  8:00 am – 7:00 pm
                </p>
                <p className="mt-3 text-sm">
                  Appointments outside office hours available upon request. Just
                  call!
                </p>
              </div>
            </div>
            <div className="social-links">
              {socials.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label} <Arrow diagonal />
                </a>
              ))}
            </div>
          </div>
          <div className="contact-form-panel">
            <h3>Send message</h3>
            <p id="form-help" className="text-muted text-sm mt-3 mb-7">
              Prepare your message here, then send it through Marci’s original
              contact form. This assessment page does not send messages.
            </p>
            <form onSubmit={prepare} aria-describedby="form-help">
              <label htmlFor="name">
                Name <span className="text-muted">(optional)</span>
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                maxLength={120}
              />
              <label htmlFor="email">
                Email <span aria-hidden="true">*</span>
                <span className="sr-only"> (required)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
              />
              <label htmlFor="message">
                Message <span className="text-muted">(optional)</span>
              </label>
              <textarea id="message" name="message" rows={4} maxLength={5000} />
              <button className="button button-dark w-full" type="submit">
                Prepare message <Arrow />
              </button>
            </form>
            <p role="status" className="text-sm mt-4">
              {status}
            </p>
            {draft && (
              <div className="draft-panel">
                <label htmlFor="draft">Your message draft</label>
                <textarea
                  id="draft"
                  ref={output}
                  value={draft}
                  readOnly
                  rows={5}
                />
                <button className="text-link" onClick={copy}>
                  Copy draft
                </button>
              </div>
            )}
            <a className="text-link mt-5 inline-flex" href={contact.form}>
              Open Marci’s contact form <Arrow diagonal />
            </a>
            <p className="text-xs text-muted mt-5">
              The original contact form is protected by reCAPTCHA; Google’s{" "}
              <a href="https://policies.google.com/privacy">Privacy Policy</a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
              apply there.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
