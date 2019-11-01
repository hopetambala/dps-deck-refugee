import React, {Component} from 'react';
import './App.css';
import { StaticMap } from 'react-map-gl';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import {ArcLayer} from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';

import { ControlPanelComponent } from "./components/control-panel";

// Set your mapbox token here
const MAPBOX_TOKEN = "pk.eyJ1IjoiaHBiYWxhIiwiYSI6ImNrMXZyNWFscjB2N2szY3FmMHdodXZ2NjMifQ.PZQEuVD4WAHGTPd4yT5YFQ"; // eslint-disable-line

// Source data CSV
const DATA_URL ='https://raw.githubusercontent.com/hopetambala/dps-deck-refugee/master/data/2_RSQSubmissions_cleaned.json'; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  //longitude: -70.1627,
  //latitude: 18.7357,
  latitude: -10.0,
  longitude: 0.0,
  zoom: 4,
  minZoom: 3,
  maxZoom: 20,
  pitch: 40.5,
  bearing: -27.396674584323023
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const elevationScale = {min: 1, max: 50};

export const inFlowColors = [
  [255, 255, 204],
  [199, 233, 180],
  [127, 205, 187],
  [65, 182, 196],
  [29, 145, 192],
  [34, 94, 168],
  [12, 44, 132]
];

export const outFlowColors = [
  [255, 255, 178],
  [254, 217, 118],
  [254, 178, 76],
  [253, 141, 60],
  [252, 78, 42],
  [227, 26, 28],
  [177, 0, 38]
];


class App extends Component {
  static get defaultColorRange() {
    return colorRange;
  }

  constructor(props) {
    super(props);
    this.state = {
      data:null,
      elevationScale: elevationScale.max
    };
  }

  _renderLayers() {
    const data = this.state.data;
    const strokeWidth = 2;
    const strokeHeight = .5;
  
      return [
        new ArcLayer({
          id: 'arc',
          data: data,
          getSourcePosition: d => d["Country of Asylum Coordinates"],
          getTargetPosition: d => d["Country of Resettlement Coordinates"],
          // getSourceColor: d => (d.gain > 0 ? inFlowColors : outFlowColors)[d.quantile],
          getSourceColor: inFlowColors[0],
          // getTargetColor: d => (d.gain > 0 ? outFlowColors : inFlowColors)[d.quantile],
          getTargetColor: outFlowColors[0],
          getWidth: strokeWidth,
          getHeight: strokeHeight
        })
      ];
    }
  componentDidMount = () =>{
    this.fetchData()
  }
  
  async fetchData(){
    const response = await fetch(DATA_URL);
    const records = await response.json();
    
    console.log(records)

    this.setState({
      data:records
    })
  }


  render() {
    const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = this.props;

    return (
      <div>
        <DeckGL
          layers={this._renderLayers()}
          //effects={[lightingEffect]}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
        >
          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>
        <ControlPanelComponent />

      </div>

    );
  }
}

export default App;
