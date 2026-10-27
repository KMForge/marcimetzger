import { useState } from "react";
import { contact } from "./data";
export default function OfficeMap() {
  const [loaded, setLoaded] = useState(false);
  return (
    <section className="office-map" aria-label="Office location map">
      {loaded ? (
        <iframe
          title="The Ridge Realty Group office in Pahrump"
          src="https://maps.google.com/maps?q=36.184402445333134,-115.95528754494798&z=15&output=embed"
          width="1200"
          height="320"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="container map-placeholder">
          <div>
            <h2>Find us in Pahrump.</h2>
            <p>{contact.address}</p>
          </div>
          <div>
            <button
              className="button button-dark"
              onClick={() => setLoaded(true)}
            >
              Load office map <span aria-hidden="true">↗</span>
            </button>
            <p className="text-xs text-muted mt-2">
              Loads Google Maps. Google’s privacy policy applies.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
