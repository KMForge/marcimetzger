import OfficeMap from "./OfficeMap";
import Header from "./Header";
import Search from "./Search";
import Gallery from "./Gallery";
import Contact from "./Contact";
import { affiliations, contact, services } from "./data";
import { Arrow, Eyebrow, Photo } from "./ui";
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <section id="home" tabIndex={-1} className="hero">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/assets/mountain-falls-pond-mobile.webp"
            />
            <Photo
              name="mountain-falls-pond"
              alt="Mountain Falls pond, green fairways and mountains in Pahrump, Nevada"
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="hero-image"
            />
          </picture>
          <div className="hero-overlay" />
          <div className="hero-content container">
            <Eyebrow>Marci Metzger · The Ridge Realty Group</Eyebrow>
            <h1>
              Pahrump.
              <br />
              <em>A place to call home.</em>
            </h1>
            <p>Your Pahrump Realtor.</p>
            <div className="hero-actions">
              <a className="button button-light" href="#search">
                Find your dream home <Arrow />
              </a>
              <a className="hero-call" href={contact.tel}>
                Call now <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>PAHRUMP, NEVADA</span>
            <a href="#about">
              Meet your local expert <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <section id="about" tabIndex={-1} className="section-pad about-section">
          <div className="container about-layout">
            <div className="portrait-frame">
              <Photo
                name="marci-metzger-portrait"
                alt="Marci Metzger, wearing a blue blazer"
              />
              <span className="portrait-caption">
                A personal approach. A local perspective.
              </span>
            </div>
            <div className="about-copy">
              <Eyebrow>Meet your Realtor</Eyebrow>
              <h2>Marci Metzger</h2>
              <p className="experience">
                Realtor for nearly
                <br />
                <em>3 decades.</em>
              </p>
              <div className="short-rule" />
              <p>
                Our team works hard everyday to grow and learn, so that we may
                continue to excel in our market. Our clients deserve our best,
                &amp; we want to make sure our best is better every year.
              </p>
              <a className="text-link" href="https://marcimetzger.com/about-us">
                More about Marci <Arrow diagonal />
              </a>
              <a className="about-phone" href={contact.tel}>
                206-919-6886
              </a>
            </div>
          </div>
        </section>
        <section
          id="results"
          tabIndex={-1}
          className="section-pad results-section"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <Eyebrow>Experience that works for you</Eyebrow>
                <h2>Get it sold.</h2>
              </div>
              <p>
                Top Residential Sales Last 5 Years
                <br />
                <span className="text-sm text-muted">
                  As featured on Marci’s original homepage.
                </span>
              </p>
            </div>
            <div className="results-feature">
              <Photo
                name="residential-sales"
                alt="Open-plan kitchen with a large island and living area"
              />
              <div className="results-copy">
                <Eyebrow>A look back at 2021</Eyebrow>
                <p className="result-number">
                  $28.5<span>M</span>
                </p>
                <p className="result-label">in closed sales</p>
                <div className="result-rule" />
                <p>
                  We helped nearly <strong>90 clients in 2021</strong>, and
                  closed 28.5 million in sales!
                </p>
              </div>
            </div>
            <div className="guidance-grid">
              <article>
                <Photo
                  name="listing-marketing"
                  alt="Illuminated home and pool at dusk"
                />
                <div>
                  <span className="story-number">
                    01 / SELL WITH CONFIDENCE
                  </span>
                  <h3>Don’t just list it…</h3>
                  <p>
                    Get it SOLD! We exhaust every avenue to ensure our listings
                    are at the fingertips of every possible buyer, getting you
                    top dollar for your home.
                  </p>
                  <a className="text-link" href="#contact">
                    Let’s talk about selling <Arrow />
                  </a>
                </div>
              </article>
              <article>
                <Photo
                  name="buyer-guidance"
                  alt="House keys with a red house-shaped keyring on a wooden table"
                />
                <div>
                  <span className="story-number">02 / BUY WITH CLARITY</span>
                  <h3>Guide to buyers</h3>
                  <p>
                    Nobody knows the market like we do. Enjoy having a pro at
                    your service. Market analysis, upgrades lists, contractors
                    on speed dial, &amp; more!
                  </p>
                  <a className="text-link" href="#search">
                    Explore your next home <Arrow />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
        <Search />
        <Gallery />
        <section
          id="services"
          tabIndex={-1}
          className="section-pad services-section"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <Eyebrow>Our services</Eyebrow>
                <h2>
                  Good guidance.
                  <br />
                  Every step of the way.
                </h2>
              </div>
              <a className="text-link" href="#contact">
                Work with Marci <Arrow />
              </a>
            </div>
            <div className="services-grid">
              {services.map((service, i) => (
                <article key={service.title}>
                  <div className="service-image">
                    <Photo name={service.image} alt={service.alt} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Contact />
        <OfficeMap />
        <section
          className="affiliations"
          aria-label="Brokerage and affiliations"
        >
          <div className="container affiliation-inner">
            <p>
              Local roots.
              <br />
              <span className="text-muted">Professional connections.</span>
            </p>
            <div>
              {affiliations.map((item) => (
                <Photo key={item.image} name={item.image} alt={item.alt} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="footer-top">
            <Photo
              name="marci-metzger-logo"
              alt="Marci Metzger Homes"
              className="footer-logo"
            />
            <nav aria-label="Original website pages">
              <a href="https://marcimetzger.com/">Home ↗</a>
              <a href="https://marcimetzger.com/listings">Listings ↗</a>
              <a href="https://marcimetzger.com/lets-move">Let’s Move ↗</a>
              <a href="https://marcimetzger.com/about-us">About Us ↗</a>
            </nav>
            <a href="#home" className="text-link">
              Back to top ↑
            </a>
          </div>
          <div className="footer-bottom">
            <p>Copyright © 2026 Marci METZGER — All Rights Reserved</p>
            <p>Independent homepage redesign · Assessment project</p>
          </div>
          <details className="privacy-note">
            <summary>Privacy &amp; original-site notices</summary>
            <p>
              This assessment page uses no analytics or tracking cookies. Draft
              messages stay in memory until you leave or reload. External
              services have their own privacy policies.
            </p>
            <p>
              Original website cookie notice: “This website uses cookies. We use
              cookies to analyze website traffic and optimize your website
              experience. By accepting our use of cookies, your data will be
              aggregated with all other user data.” The original “Accept”
              control applies on that website; no consent is needed for tracking
              on this page because none is installed.
            </p>
          </details>
        </div>
      </footer>
    </>
  );
}
