class Panel {
  constructor($container) {
    this.$container = $container;
  }
  show() {
    this.$container.show();
  }
  hide() {
    this.$container.hide();
  }
}

class SearchPanel extends Panel {
  constructor() {
    super(
      $(
        `<section class="search__container">
                <form>
                    <input type="text" name="query" placeholder="Search an artist">
                    <button class='btn btn-primary btn-sm' type="submit">Search</button>
                </form>
            </section>
        `
      )
    );
    this.__$form__ = this.$container.find("form");
    this.__$query__ = this.__$form__.find("input");
  }

  set onSearch(callback) {
    this.__$form__.on("submit", e => {
      e.preventDefault();
        $('.results__container').removeClass('small');
      const query = this.__$query__.val();

      callback(query);
    });
  }
}

class ArtistsPanel extends Panel {
  constructor() {
    super(
      $(
        `<section class="results__container">
                <h3>Artists</h3>
                <ul class="card-columns">
                </ul>
            </section>`
      )
    );

    this.__$list__ = this.$container.find("ul");
  }

    transformArtistName(artistName) {
        if(artistName.length>40){
           return artistName.substring(0,40)+'...';
        } 
        return artistName;
    }

  set artists(artists) {
    this.__$list__.empty();
    artists.forEach((data) => {
      const $item = $(
          `<li data-id=${data.id} class="card__album card bg-light mb">
                <img class="card-img" src="${data.images[0]? data.images[0].url : 'images/spotify.png'}" />
                <p class="card-img-overlay">${this.transformArtistName(data.name)}</p>
            </li>`);
      $item.on("click", () => {
          $('.results__container').addClass('small');
          $item.addClass('selected');
        this.__onArtistClicked__($item.data("id"));
      });
      this.__$list__.append($item);
    });
  }

  set onArtistClicked(callback) {
    this.__onArtistClicked__ = callback;
  }
}

class AlbumsPanel extends Panel {
  constructor() {
    super(
      $(
        `<section class="results__albums">
                <ul>
                </ul>
            </section>`
      )
    );
    this.__$list__ = this.$container.find("ul");
  }

  set albums(albums) {
    this.__$list__.empty();
    albums.forEach((data) => {
      const $item = $(`<li class='album__list' data-id=${data.id}>
                          <img class="albums__img" src="${data.images[0].url}" />
                          <p>${data.name}</p>
                      </li>`);
      $item.on("click", () => {
        
        $('.results__albums').addClass('selected');
          $item.addClass('selectedAlbum');
        this.__onAlbumClicked__($item.data("id"));
      });
      this.__$list__.append($item);
    });
  }

  set onAlbumClicked(callback) {
    this.__onAlbumClicked__ = callback;
  }
}

class TracksPanel extends Panel {
  constructor() {
    super(
      $(
        `<section class='results__tracks'>
                <ul>
                </ul>
         </section>`
      )
    );

    this.__$list__ = this.$container.find("ul");
  }

  set tracks(tracks) {
    this.__$list__.empty();
    tracks.forEach(({ name, id }) => {
      const $item = $(`<li data-id=${id}>${name}</li>`);
      $item.on('click', () => {
          this.__onTrackClicked__($item.data('id'));
      });
      this.__$list__.append($item);
    });
  }
  set onTrackClicked(callback){
      this.__onTrackClicked__ = callback;
  }
}

class SelectedTrackPanel extends Panel {
  constructor() {
    super(
      $(
        `<section>
                <div>
                </div>
            </section>`
      )
    );

    this.__$selectedTrack__ = this.$container.find('div');
  }

  set selectedTrack(track) {
    this.__$selectedTrack__.empty();
    const $item = $(`<div data-id=${track.id}>${track.name}</div>`);
    this.__$selectedTrack__.append($item);
  }
}
