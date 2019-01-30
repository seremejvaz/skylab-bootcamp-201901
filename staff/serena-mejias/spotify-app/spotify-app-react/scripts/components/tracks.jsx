class Track extends React.Component {
    handleSelectedTrack = (trackId) => {
        const {
            props: { onSearchSelectedTrack }
        } = this;
        onSearchSelectedTrack(trackId);
    }
    
    render(){
        const { handleSelectedTrack,
            props: { tracks } 
        } = this;

        return (<section className='results__tracks'>
                    <ul>
                        { tracks.map(({name, id})=> {
                            return <li key = {id} data-id={id} onClick={()=>handleSelectedTrack(id)}>{name}</li>
                        })
                        }
                    </ul>
                </section>
        );
    }
}