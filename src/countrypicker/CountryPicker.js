// @flow
/* eslint import/newline-after-import: 0 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import cca2List from './data/cca2.json';

import EmojiComponent from './Emoji';

import emojicountries from './data/countries-emoji.json';
import datacountries from './data/countries.json';

let countries = null;
let Emoji = null;
let memo;

// let isEmojiable = Platform.OS === 'ios';
let isEmojiable = true;

const FLAG_TYPES = {
  flat: 'flat',
  emoji: 'emoji',
};

const setCountries = (flagType) => {
  if (typeof flagType !== 'undefined') {
    isEmojiable = flagType === FLAG_TYPES.emoji;
  }

  if (isEmojiable) {
    countries = emojicountries;
    Emoji = EmojiComponent;
  } else {
    countries = datacountries;
    Emoji = <div />;
  }
};

setCountries('emoji');

const styles = {
  popover: {
    minWidth: 380,
    maxHeight: 400,
  },

  emojiFlag: {
    margin: 0,
    width: 24,
    height: 24,
    paddingTop: 8,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
};

export default class CountryPicker extends Component {
  static propTypes = {
    cca2: PropTypes.string.isRequired,
    translation: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    closeable: PropTypes.bool,
    filterable: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
    countryList: PropTypes.array,
    excludeCountries: PropTypes.array,
    styles: PropTypes.object,
    filterPlaceholder: PropTypes.string,
    autoFocusFilter: PropTypes.bool,
    // to provide a functionality to disable/enable the onPress of Country Picker.
    disabled: PropTypes.bool,
    transparent: PropTypes.bool,
    animationType: PropTypes.oneOf(['slide', 'fade', 'none']),
    flagType: PropTypes.oneOf(Object.values(FLAG_TYPES)),
    hideAlphabetFilter: PropTypes.bool,
    renderFilter: PropTypes.func,
    size: PropTypes.number,
  };

  static defaultProps = {
    translation: 'eng',
    countryList: cca2List,
    excludeCountries: [],
    filterPlaceholder: 'Filter',
    autoFocusFilter: true,
    transparent: false,
    animationType: 'none',
    children: <div />,
    onClose: () => {},
    closeable: true,
    styles: {},
    filterable: true,
    disabled: false,
    flagType: 'flat',
    renderFilter: () => <div />,
    hideAlphabetFilter: true,
    size: 32,
  };

  static renderEmojiFlag({ cca2, size }) {
    return (
      <div style={styles.emojiFlag}>
        {cca2 !== '' && countries[cca2.toUpperCase()] ? (
          <Emoji name={countries[cca2.toUpperCase()].flag} />
        ) : null}
      </div>
    );
  }

  static renderImageFlag({ cca2, size }) {
    return cca2 !== '' ? (
      <Avatar
        alt={`${cca2}`}
        src={countries[cca2].flag}
        style={{ height: size, width: size, margin: 0 }}
      />
    ) : null;
  }

  static renderFlag({ cca2, size }) {
    return isEmojiable
      ? CountryPicker.renderEmojiFlag({ cca2, size })
      : CountryPicker.renderImageFlag({ cca2, size });
  }

  constructor(props) {
    super(props);

    setCountries(props.flagType);
    let countryList = [...props.countryList];
    const excludeCountries = [...props.excludeCountries];

    excludeCountries.forEach((excludeCountry) => {
      const index = countryList.indexOf(excludeCountry);

      if (index !== -1) {
        countryList.splice(index, 1);
      }
    });

    countryList = countryList
      .map((c) => [c, this.getCountryName(countries[c])])
      .sort((a, b) => {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return 0;
      })
      .map((c) => c[0]);

    this.state = {
      cca2List: countryList,
      dataSource: countryList,
      anchorEl: null,
      cca2: props.cca2,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.countryList !== this.props.countryList) {
      this.setState({
        cca2List: this.props.countryList,
        dataSource: this.props.countryList,
        cca2: this.props.cca2,
      });
    }
  }

  onSelectCountry = (cca2) => {
    if (cca2) {
      this.props.onChange({
        cca2,
        ...countries[cca2],
        flag: undefined,
        name: this.getCountryName(countries[cca2]),
      });
      this.setState({ anchorEl: null, cca2 });
    } else {
      this.setState({ anchorEl: null });
      this.props.onChange(null);
    }
  };

  onClose = () => {
    this.setState({
      dataSource: this.state.cca2List,
    });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  getCountryName(country, optionalTranslation) {
    const translation = optionalTranslation || this.props.translation || 'eng';
    return country.name[translation] || country.name.common;
  }

  getLetters(list) {
    return Object.keys(
      list.reduce(
        (acc, val) => ({
          ...acc,
          [this.getCountryName(countries[val]).slice(0, 1).toUpperCase()]: '',
        }),
        {}
      )
    ).sort();
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderCountries() {
    const { dataSource } = this.state;
    const { size } = this.props;
    if (memo) {
      return memo;
    }

    memo = dataSource.map((cca2) => {
      const country = countries[cca2];
      return (
        <ListItem key={cca2} button onClick={() => this.onSelectCountry(cca2)}>
          <ListItemAvatar>
            {CountryPicker.renderFlag({ cca2, size })}
          </ListItemAvatar>
          <ListItemText primary={this.getCountryName(country)} />
        </ListItem>
      );
    });
    return memo;
  }

  render() {
    const { anchorEl, cca2 } = this.state;
    const { size } = this.props;

    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <IconButton onClick={this.handleClick} style={{ padding: 5 }}>
          {CountryPicker.renderFlag({ cca2, size })}
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <List dense style={styles.popover}>
            {this.renderCountries()}
          </List>
        </Popover>
      </Fragment>
    );
  }
}
