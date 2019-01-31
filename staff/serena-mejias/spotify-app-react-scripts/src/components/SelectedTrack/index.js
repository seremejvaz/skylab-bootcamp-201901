import React from 'react';
import './index.scss';

class SelectedTrack extends React.Component {
    render() {
        const { props: {selectedTrack:{preview_url}} } = this;

        return <div>
                    <audio className='player' src={preview_url} controls></audio>
               </div>
    }
}

export default SelectedTrack;