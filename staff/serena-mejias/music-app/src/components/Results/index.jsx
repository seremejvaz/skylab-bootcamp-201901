import React, { Component } from "react";

class Results extends Component {
  render() {
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
                  {name}
                </a>{" "}
              </li>
            ))}
        </ul>
      </section>
    );
  }
}
export default Results;
