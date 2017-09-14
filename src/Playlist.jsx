import React, {Component} from 'react';
class Playlist extends Component {

    constructor(props){
        super(props);
        this.state ={
            list:[]
        }
    }

    render(){

        let playlist = this.props.playlist && this.props.playlist.map((d)=>{
            return <div className="track" key={d.title}>
                <img src={d.image} className="track-img" alt="imageAlt"></img>
                <p className="track-name">{d.title} by  {d.artist}</p>
            </div>
        });
        return (<div>
            {playlist}</div>)
    }

}

export default Playlist;