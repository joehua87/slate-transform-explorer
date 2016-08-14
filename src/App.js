import React, { Component } from 'react';
import './App.css';
const data = require('./output.json');
const keys = Object.keys(data)

class App extends Component {
  state = {
    fixture: null,
  };

  onFixtureChange = (fixture) => {
    this.setState({ fixture })
  };

  renderData = (key, data, className) => (
    <div key={key} className={className}>
      <h3>{key}</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );

  renderFixture = (fixture) => {
    const fixtureKeys = Object.keys(fixture);
    return (
      <div>
        {fixtureKeys.map((key) => {
          const { input, output, index, ...others } = fixture[key]
          const otherKeys = Object.keys(others)
          return (
            <div key={key} className="row">
              <h2 className="col-sm-12">{key}</h2>
              {otherKeys.length > 0 && (
                <div className="col-sm-12">
                  <h3>Data</h3>
                  {otherKeys.map((key) => this.renderData(key, others[key]))}
                </div>
              )}
              <div className="col-sm-6">
                <h3>Input</h3>
                <pre>{JSON.stringify(input, null, 2)}</pre>
              </div>
              <div className="col-sm-6">
                <h3>Output</h3>
                <pre>{JSON.stringify(output, null, 2)}</pre>
              </div>
              <div className="col-sm-12">
                <details>
                  <summary>Scripts</summary>
                  <pre>{index}</pre>
                </details>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <h2>Slate Transform Explorer</h2>
        <div className="row">
          <ul className="col-sm-3">
            {keys.sort().map((key) => <li key={key} onClick={() => this.onFixtureChange(key)}>{key}</li>)}
          </ul>
          <div className="col-sm-9">
            {!this.state.fixture && (
              <p>Select Fixture on the left sidebar</p>
            )}
            {this.state.fixture && (
              <div>
                <h1>{this.state.fixture}</h1>
                {this.renderFixture(data[this.state.fixture])}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
