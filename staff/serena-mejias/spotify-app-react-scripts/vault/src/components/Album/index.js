import React from 'react';
import './index.scss';

class Album extends React.Component {

handleSearchTracks = (query) => {
    const {
        props: { onSearchTracks }
    } = this;
    onSearchTracks(query);
}

  render() {
    const { handleSearchTracks,
      props: { albums }
    } = this;

    return (
      <section className="results__albums">
        <ul>
          {albums.map(({ name, id, images }) => {
            const imageAlbums = images[0].url;
            return (
              <li key={id} className="album__list" data-id={id} onClick={() => handleSearchTracks(id)}>
                <img className="albums__img" src={imageAlbums} />
                <p>{name}</p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default Album;