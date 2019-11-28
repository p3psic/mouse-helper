import * as React from 'react';
import { MousePosition } from './components';
import { ipcRenderer } from 'electron';

interface State {
  mouseData: {
    x: number,
    y: number,
    color: string,
  }
}

export class App extends React.Component<undefined, State> {
  state = {
    mouseData: {
      x: 0,
      y: 0,
      color: '',
    }
  }

  componentDidMount() {
    ipcRenderer.on('data', (event, data) => {
      if (!data || !data.x) return;
      console.log(data)

      this.setState({
        mouseData: data,
      });
    });
  }

  render() {
    const { mouseData } = this.state;

    return (
      <div>
        <MousePosition {...mouseData} />
      </div>
    );
  };
}
