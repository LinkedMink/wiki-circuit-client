import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controlId: `rangeSelector${controlIdIncrement}`,
      selectedValue: Math.floor((props.max + props.min) / 2)
    };

    controlIdIncrement++;
  }

}

export default BaseControl;