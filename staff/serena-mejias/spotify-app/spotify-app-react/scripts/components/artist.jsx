class Artist extends React.Component {
  state = { name: "", id: "", image: "" };

  handleSearchAlbums = () => {
    const {
      state: { query },
      props: { onSearchAlbums }
    } = this;
    onSearchAlbums(query);
  };

  render() {
    const {
      props: { artists }
    } = this;

    return (
      <section className="results__container">
        <h3>Artists</h3>
        <ul className="card-columns">
          {artists.map(({ name, id, images }) => {
            const imageArtists = images[0]
              ? images[0].url
              : "images/spotify.png";
            return (
              <li
                data-id={id}
                className="card__album card bg-light mb"
                onClick={handleSearchAlbums}
              >
                <img className="card-img" src={imageArtists} />
                <p className="card-img-overlay">{name}</p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
