class Album extends React.Component {
  state = { name: "", id: "", image: "" };

  render() {
    const {
      props: { albums }
    } = this;

    return (
      <section class="results__albums">
        <ul>
          {albums.map(({ name, id, images }) => {
            const imageAlbums = images[0].url;
            return (
              <li class="album__list" data-id={id}>
                <img class="albums__img" src={imageAlbums} />
                <p>{name}</p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
