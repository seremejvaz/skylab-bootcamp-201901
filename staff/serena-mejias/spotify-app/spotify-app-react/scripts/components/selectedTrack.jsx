class SelectedTrack extends React.Component {
    render() {
        const { props: {selectedTrack:{preview_url}} } = this;

        return <div>
                    <audio src={preview_url} controls></audio>
               </div>

    }
}