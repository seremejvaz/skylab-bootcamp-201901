import React from 'react';
import './index.scss';

class Artist extends React.Component {

  handleSearchAlbums = (query) => {
    const {
      props: { onSearchAlbums }
    } = this;
    onSearchAlbums(query);
  };

  render() {
    const { handleSearchAlbums,
      props: { artists }
    } = this;

    return (
      <section className="artists__container">
        <h3>Artists</h3>
        <div className='columns'>
        <div className='column is-two-thirds is-offset-one-fifth'>
            <ul className='columns is-mobile is-multiline is-centered'>
              {artists.map(({ name, id, images }) => {
                const imageArtists = images[0]
                ? images[0].url
               : "images/spotify.png";
                return (
                   <li key={id}
                    data-id={id}
                    className="card__album column card is-half-widescreen is-half-tablet is--half-mobile has-text-centered"
                    onClick={()=> handleSearchAlbums(id)}
                    >
                <div class="card-image">
                  <figure class="image is-4by3">
                      <img  src={imageArtists} />
                  </figure>
                </div>
                  <div className='media-content'>
                      <p className="title-is-4">{name}</p>
                  </div>
                </li>
            );
          })}
        </ul>
        </div>
        </div>
      </section>
    );
  }
}

export default Artist;
