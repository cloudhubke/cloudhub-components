import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import isEqual from 'lodash/isEqual';
import Chip from '@mui/material/Chip';

const useStyles = (containerStyle) =>
  makeStyles(({ sizes }) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: sizes.padding,
      ...containerStyle,
    },
    chip: {
      margin: sizes.margin,
    },
  }));

const Chips = ({
  onChange,
  onDelete,
  keyExtractor,
  labelExtractor,
  propsExtractor,
  containerStyle,
  data,
  ...props
}) => {
  const classes = useStyles(containerStyle)();
  const [chipData, setChipData] = React.useState(data);

  useEffect(() => {
    if (!isEqual(data, chipData)) {
      onChange(data || []);
      setChipData(data || []);
    }
  }, [chipData, data]);

  return (
    <div className={classes.root}>
      {chipData.map((item, index) => (
        <Chip
          key={`${keyExtractor(item, index)}`}
          label={`${labelExtractor(item, index)}`}
          onDelete={() => onDelete(item, index)}
          className={classes.chip}
          {...propsExtractor(item, index)}
          {...props}
        />
      ))}
    </div>
  );
};

Chips.defaultProps = {
  keyExtractor: (item, index) =>
    typeof item === 'object' ? item.id || `chip-${index}` : `chip-${index}`,
  labelExtractor: (item, index) =>
    typeof item === 'object' ? item.id || `${index}` : `${item}`,
  onChange: () => null,
  onDelete: () => null,
  propsExtractor: () => ({}),
};

export default Chips;
