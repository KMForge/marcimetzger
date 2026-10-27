import { useEffect, useRef, useState } from "react";
import { contact } from "./data";
import { Photo } from "./ui";
const navigation = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Meet Marci" },
  { href: "#search", label: "Find a home" },
  { href: "#services", label: "Our services" },
  { href: "#contact", label: "Let’s talk" },
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    nav.current?.querySelector("a")?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#home" aria-label="Marci Metzger Homes — home">
          <Photo
            name="marci-metzger-logo"
            alt="Marci Metzger Homes"
            loading="eager"
            className="brand"
          />
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-phone" href={contact.tel}>
          {contact.phone} <span aria-hidden="true">↗</span>
        </a>
        <button
          ref={button}
          className="menu-toggle"
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        ref={nav}
        hidden={!open}
        aria-label="Mobile navigation"
        className="mobile-nav"
        onBlur={(e) => {
          if (
            !e.currentTarget.contains(e.relatedTarget) &&
            e.relatedTarget !== button.current
          )
            setOpen(false);
        }}
      >
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => {
              setOpen(false);
              document
                .querySelector<HTMLElement>(item.href)
                ?.focus({ preventScroll: true });
            }}
          >
            {item.label}
          </a>
        ))}
        <a href={contact.tel}>Call {contact.phone}</a>
      </nav>
    </header>
  );
}
