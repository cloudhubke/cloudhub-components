import React from 'react';
import Text from './Text';
import Block from './Block';
import Button from './Button';

import { sizes, fonts } from '../theme';

const FieldLabel = ({
  label,
  icon,
  onClick,
  height,
  buttonProps,
  textStyles,
  disabled,
}) => {
  const styles = {
    button: {
      textTransform: 'none',
      padding: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height,
    },
  };

  const renderIcon = IconComponent => (
    <IconComponent
      style={{
        marginRight: sizes.margin,
        ...textStyles,
      }}
    />
  );

  return (
    <Block style={{ marginRight: sizes.margin }}>
      <Button
        onClick={onClick}
        style={styles.button}
        disabled={disabled}
        {...buttonProps}
      >
        {renderIcon(icon)}

        <Text cropped style={{ ...textStyles }}>
          {label}
        </Text>
      </Button>
      <Text small error style={{ height: 10 }} />
    </Block>
  );
};

FieldLabel.defaultProps = {
  label: 'Label',
  height: sizes.inputHeight,
  onClick: () => {},
  textStyles: { ...fonts.header, color: 'inherit' },
  disabled: true,
};

export default FieldLabel;
