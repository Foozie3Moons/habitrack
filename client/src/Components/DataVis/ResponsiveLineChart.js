import React, { Component } from 'react';
import Measure from 'react-measure';
import classNames from 'classnames';
import LineChart from './LineChart';
import '../../Styles/Responsive.css';

class ResponsiveLineChart extends Component {
  state = {
    dimensions: {
      width: -1,
      height: -1
    }
  }

  render() {
    const { width, height } = this.state.dimensions
    const className = classNames(
      (width < 600) && 'small-width-modifier'
    )

    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState({ dimensions: contentRect.bounds })
        }}
      >
      {({ measureRef }) =>
        <div ref={measureRef} className={className}>
          <LineChart width={this.state.dimensions.width} data={this.props.data}/>
        </div>
      }
      </Measure>
    )
  }
}

export default ResponsiveLineChart;
