import React, {Component} from 'react';
import Profile from './Profile';
import nba from '../nba-client';
import DataViewContainer from './DataViewContainer';
import SearchBar from './SearchBar';
import {DEFAULT_PLAYER_INFO} from '../constants';

class Main extends Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
        // playerId: 201939,
        // playerInfo: {}
    }

    //state method 2: constructor.
    // constructor() {
    //     super();
    //     this.state = {
    //         playerInfo: {}
    //     }
    // }

    // request to get playerID -> to get playInfo
    // componentDidMount -> last step before real DOM
    componentDidMount() {
        window.nba = nba;
        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }

    // states: key value pair
    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({PlayerID: nba.findPlayer(playerName).playerId})
            .then((info) => {
                    console.log(info);
                    // object.assign -- copy and merge
                    const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                    console.log(playerInfo);
                    this.setState({playerInfo: playerInfo});
                })
    }

    // search bar callback step 2
    handleSelectPlayer = (playerName) => {
        console.log(playerName);
        this.loadPlayerInfo(playerName);
    }

    render() {
        return (
            <div className="main">
                <SearchBar
                    // search bar callback step 1
                    handleSelectPlayer={this.handleSelectPlayer}
                />
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}

export default Main;
