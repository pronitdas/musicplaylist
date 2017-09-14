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

    getData(){
        console.log("this is called");
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl+"http://www.bbc.co.uk/radio1/playlist.json")
            .then(d => d.json())
            .then(data => {
                var play = [];
                var playLists = Object.keys(data['playlist']);
                _.forEach(playLists, (d)=>{
                    console.log("forown", d);
                    play.push(<Playlist playlist={data['playlist'][d]} name={d} key={d} />);
                });
                this.setState({playlist:play});
            })
            .catch((err) => {
                console.log("Failed to load data: " + err);
            });
    }

    componentDidUpdate() {
        setTimeout(console.log("state",this.state), 2000);
    };

    componentDidMount(){
        this.getData();
        setInterval(()=> this.getData, 60000);
    }

    render(){
        const { playlist } = this.state;

        return (
            <div>

            <div className="App-title">
                Music Playlist
            </div>

            <div>
                {playlist &&
                playlist
                }
            </div>
            </div>


        )
    }
}

export default App;