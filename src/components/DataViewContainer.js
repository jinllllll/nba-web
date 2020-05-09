import React, {Component} from 'react';
import _ from 'lodash';
import {Radio, Row, Col, Switch} from 'antd';

import ShotChart from './ShotChart';
import CounterSlider from './CounterSlider'

const RadioGroup = Radio.Group;

class DataViewContainer extends Component {
    state = {
        minCount: 2,
        chartType: 'hexbin',
        displayTooltip: true,
    }

    //callback funcs
    onCountSliderChange = (count) => {
        this.setState({ minCount: count });
    }

    onChartTypeChange = (e) => {
        this.setState({chartType: e.target.value});
    }

    onTooltipChange = (displayTooltip) => {
        this.setState({displayTooltip});
    }

    render() {
        return (
            <div className="data-view">
                {/*callback step 1:*/}
                <ShotChart playerId={this.props.playerId}
                           minCount={this.state.minCount}
                           chartType={this.state.chartType}
                           displayTooltip={this.state.displayTooltip}
                />

                <div className="filters">
                {this.state.charType === 'hexbin' ?
                            <CounterSlider
                                value={this.state.minCount}
                                onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}/>

                        : null}

                    <br/>
                    <Row>
                        <Col span={9}>
                            <RadioGroup onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={4}>
                            <Switch
                                checkedChildren="On"
                                unCheckedChildren="Off"
                                onChange={this.onTooltipChange}
                                defaultChecked />
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default DataViewContainer;
