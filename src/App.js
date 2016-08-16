import React, { Component } from 'react';
import SlateViewer from './SlateViewer';
import './App.css';
const data = require('./output.json');
const keys = Object.keys(data)

const Viewer = ({ name, data, className }) => (
  <div className={className}>
    <h3>{name}</h3>
    <div style={{ padding: 10, border: '1px solid' }}>
      <SlateViewer rawState={data} />
    </div>
    <details>
      <summary>View JSON</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  </div>
)

Viewer.propTypes = {
  name: React.PropTypes.string.isRequired,
  data: React.PropTypes.any,
  className: React.PropTypes.string,
}

class App extends Component {
  state = {
    fixture: null,
  };

  onFixtureChange = (fixture) => {
    this.setState({ fixture })
  };

  renderFixture = (fixture) => {
    const fixtureKeys = Object.keys(fixture);
    return (
      <div>
        {fixtureKeys.map((name, idx) => {
          const { input, output, index, ...others } = fixture[name]
          const otherKeys = Object.keys(others)
          return (
            <div key={idx} className="row">
              <h2 className="col-sm-12">{name}</h2>
              {otherKeys.length > 0 && (
                <div className="col-sm-12">
                  <h3>Others Data</h3>
                  {otherKeys.map((childName, childIdx) => (
                    <Viewer key={childIdx} name={childName} data={others[childName]} />
                  ))}
                </div>
              )}
              <Viewer className="col-sm-6" name="Input" data={input} />
              <Viewer className="col-sm-6" name="Output" data={output} />
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
