import React, {Component} from 'react';
import styled from 'styled-components';

const Div = styled.div`
    position: absolute;
    top: 0;
    width: 344px;
    background: #fff;
    box-shadow: 0 0 4px rgba(0,0,0,.15);
    margin: 24px;
    padding: 12px 24px;
    max-height: 96%;
    overflow-x: hidden;
    overflow-y: overlay;
    outline: none;
    right: 0;
`;

export class ControlPanelComponent extends Component {

    render(){
        return(
            <Div id="control-panel">

                <div>
                    <h3>United Nations Refugee Resettlement</h3>
                    <p>Asylum seeking to Resettlement from 2001 to 2019</p>
                    <p>The layer creates an arc from the country of orign to the asylum</p>
                    {/* <div><div>Accidents<b>140.1K</b></div></div> */}
                </div>
                {/* <div>
                    <label>Radius</label>
                    <input id="radius" type="range" min="1000" max="20000" step="1000" value="1000"></input>
                    <span id="radius-value"></span>
                </div>
                <div>
                    <label>Coverage</label>
                    <input id="coverage" type="range" min="0" max="1" step="0.1" value="1"></input>
                    <span id="coverage-value"></span>
                </div>
                <div>
                    <label>Upper Percentile</label>
                    <input id="upperPercentile" type="range" min="90" max="100" step="1" value="100"></input>
                    <span id="upperPercentile-value"></span>
                </div> */}
            </Div>
        )
    }

}

