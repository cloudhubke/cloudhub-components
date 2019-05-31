import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Block, Text } from 'components';
import CountryPicker from './CountryPicker';

const styles = () => ({
  root: {},
});
class PickCountry extends Component {
  static defaultProps: {
    onCallingCodeChanged: () => {},
    cca2: 'KE',
    callingCode: '254',
    showCode: true,
    size: 24,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes, showCode } = this.props;
    return (
      <Block row middle className={classes.root}>
        <CountryPicker
          closeable
          filterable
          onChange={({ cca2, callingCode }) => {
            this.props.onCallingCodeChanged({ cca2, callingCode });
          }}
          cca2={this.props.cca2}
          translation="eng"
          style={{ flexDirection: 'row' }}
          animationType="slide"
          filterPlaceholder="Search Country"
          flagType="flat"
          size={this.props.size}
        />
        {showCode && <Text size={18}>{`+${this.props.callingCode} `}</Text>}
      </Block>
    );
  }
}
export default withStyles(styles)(PickCountry);
