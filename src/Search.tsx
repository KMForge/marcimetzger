import { useRef, type FormEvent } from "react";
import options from "./search-options.json";
import { Arrow, Eyebrow, Photo } from "./ui";
const fields = [
  { label: "Location", name: "city[]", options: options[0] },
  { label: "Type", name: "pt", options: options[1] },
  { label: "Sort by", name: "srt", options: options[2] },
  { label: "Bedrooms", name: "bd", options: options[3] },
  { label: "Baths", name: "tb", options: options[4] },
];
export default function Search() {
  const maxPrice = useRef<HTMLInputElement>(null);
  function validate(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const data = new FormData(form);
    const min = Number(data.get("lp"));
    const max = Number(data.get("hp"));
    maxPrice.current?.setCustomValidity(
      data.get("hp") !== "" && max < min
        ? "Maximum price must be at least the minimum price."
        : "",
    );
    if (!form.reportValidity()) event.preventDefault();
  }
  return (
    <section id="search" tabIndex={-1} className="search-section section-pad">
      <Photo
        name="search-landscape"
        alt="Contemporary home with a swimming pool at sunset"
        className="search-image"
      />
      <div className="search-shade" />
      <div className="container relative">
        <Eyebrow>Your next chapter</Eyebrow>
        <h2>Find your dream home.</h2>
        <form
          action="https://theridgerealty.idxbroker.com/idx/results/listings"
          method="get"
          className="search-form"
          onSubmit={validate}
          onInput={() => maxPrice.current?.setCustomValidity("")}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
            <h3>Search listings</h3>
            <span className="text-sm text-muted">
              Live listings · The Ridge Realty Group
            </span>
          </div>
          <input type="hidden" name="ccz" value="city" />
          <div className="search-fields">
            {fields.map((field) => (
              <label
                htmlFor={`search-${field.name}`}
                key={field.name}
                className={field.name === "srt" ? "sort-field" : ""}
              >
                {field.label}
                <select
                  id={`search-${field.name}`}
                  aria-label={field.label}
                  name={field.name}
                  defaultValue={
                    field.name === "city[]"
                      ? "35146"
                      : field.name === "srt"
                        ? "newest"
                        : ""
                  }
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <label>
              Min price
              <input
                name="lp"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                placeholder="No minimum"
              />
            </label>
            <label>
              Max price
              <input
                ref={maxPrice}
                name="hp"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                placeholder="No maximum"
              />
            </label>
            <button className="button button-dark" type="submit">
              Search now <Arrow />
            </button>
          </div>
          <p className="text-sm text-muted mt-5">
            Search opens the brokerage’s property website.
          </p>
        </form>
      </div>
    </section>
  );
}
