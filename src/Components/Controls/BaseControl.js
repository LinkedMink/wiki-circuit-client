import React from 'react';

class BaseControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controlId: `rangeSelector${controlIdIncrement}`,
      selectedValue: Math.floor((props.max + props.min) / 2)
    };

    controlIdIncrement++;
  }

  handleChange = (event) => {
    this.setState({selectedValue: event.target.value});
    if (this.props.onValueChange) {
      this.props.onValueChange(event.target.value);
    }
  }

  get formKey() {

  }

  get formValue() {
    
  }
}

export default BaseControl;