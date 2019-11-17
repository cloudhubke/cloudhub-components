import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import isEqual from 'lodash/isEqual';
import Chip from '@material-ui/core/Chip';
import { sizes } from './theme';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: sizes.pa
  },
  chip: {
    margin: sizes.margin
  }
}));

const Chips = ({ onChange, extractKey, extractLabel, data, icon }) => {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState(data);

  const handleDelete = index => () => {
    setChipData(data => data.filter((chip, i) => i !== index));
  };

  useEffect(() => {
    if (!isEqual(data, chipData)) {
      setChipData(data || []);
    }
  }, [data]);

  useEffect(() => {
    if (!isEqual(data, chipData)) {
      onChange(data || []);
    }
  }, [chipData, data]);

  return (
    <div className={classes.root}>
      {chipData.map((data, index) => (
        <Chip
          key={`${extractKey(data, index)}`}
          icon={icon || null}
          label={`${extractLabel(data, index)}`}
          onDelete={handleDelete(index)}
          className={classes.chip}
        />
      ))}
    </div>
  );
};

Chips.defaultProps = {
  extractLabel: () => null,
  extractKey: () => null,
  onChange: () => null
};

export default Chips;
