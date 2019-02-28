import React from "react";

function Results({ results, onItemClick }) {
  debugger
    return (
      <section>
        <ul>
          {results &&
            results.map(({ id }) => (
              <li className="results__item" key={id}>
                <a
                  href="#"
                  onClick={event => {
                    event.preventDefault();
                    onItemClick(id);
                  }}
                >
                  {results.name}
                </a>
              </li>
            ))}
        </ul>
      </section>
    );
  }

export default Results;
