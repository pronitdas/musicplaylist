import React, {Component} from 'react';
import Playlist from './Playlist';

import './style.css';
var _ = require('lodash');

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
          playlist: [],
        };
    }

    getData = () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl+"http://www.bbc.co.uk/radio1/playlist.json")
            .then(d => d.json())
            .then(data => {
                let play = [];
                let playLists = Object.keys(data['playlist']);
                _.forEach(playLists, (d)=>{
                    let title = d.length>1 && _.startCase(d);
                    play.push(<Playlist playlist={data['playlist'][d]} name={title} key={d} />);
                });
                this.setState({playlist:play});
            })
            .catch((err) => {
                console.log("Failed to load data: " + err);
            });
    };

    componentDidMount(){
        this.getData();
        setInterval(this.getData, 60000);
    }

    render(){
        const { playlist } = this.state;

        return (
            <div>
                <div className="App-title">
                    Music Playlist
                </div>
                <div>
                    {playlist}
                </div>
            </div>
        )
    }
}

export default App;