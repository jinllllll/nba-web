import React, {Component} from 'react';

import nba from '../nba-client';
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';
import { court, shots } from 'd3-shotchart';
import PropTypes from 'prop-types';

class ShotChart extends Component {

    componentDidMount() {
        nba.stats.shots({
            PlayerID: this.props.playerId
        }).then((response) => {
            const final_shots = response.shot_Chart_Detail.map(
                shot=> (
                    {
                        x: (shot.locX + 250) / 10,
                        y: (shot.locY + 50) / 10,
                        action_type: shot.actionType,
                        shot_distance: shot.shot_distance,
                        shot_made_flag: shot.shot_made_flag,
                    }
                )
            );
            }

        )
    }

    render() {
        return (
            <div>
                <div id="shot-chart"></div>
            </div>
        );
    }
}

export default ShotChart;
