import React, {Component} from 'react';
import Profile from './Profile';
import nba from '../nba-client';
import ShotChart from './ShotChart'

class Main extends Component {
    state = {
        playerInfo: {}
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
        window.nba= nba;
        // states: key value pair
        nba.stats.playerInfo({ PlayerID: nba.findPlayer('Stephen Curry').playerId})
            .then((info) => {
                console.log(info);
                // object.assign -- copy and merge
                const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                console.log(playerInfo);
                this.setState({playerInfo: playerInfo});
                }
            )
    }


    render() {
        return (
            <div className="main">
                <Profile playerInfo={this.state.playerInfo} />
                <ShotChart playerId = {this.state.playerInfo.playerId} />
            </div>
        );
    }
}

export default Main;
