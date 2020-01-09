import React from 'react';
import Text from './Text';
import Block from './Block';
import Button from './Button';

import { sizes } from './theme';

const FieldLabel = ({
  label,
  icon,
  onClick,
  height,
  buttonProps,
  textStyles,
  containterStyles,
  children,
  disabled,
  ...props
}) => {
  const styles = {
    button: {
      textTransform: 'none',
      padding: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height
    }
  };

  const renderIcon = IconComponent => (
    <IconComponent
      style={{
        marginRight: sizes.margin,
        ...textStyles
      }}
    />
  );

  return (
    <Block style={{ marginRight: sizes.margin, ...containterStyles }}>
      <Button
        onClick={onClick}
        style={styles.button}
        disabled={disabled}
        {...props}
      >
        {renderIcon(icon)}

        {label && (
          <Text cropped style={{ ...textStyles }}>
            {label}
          </Text>
        )}
        {children}
      </Button>
      <Text small error style={{ height: 10 }} />
    </Block>
  );
};

FieldLabel.defaultProps = {
  label: 'Label',
  height: sizes.inputHeight,
  onClick: () => {},
  textStyles: { color: 'inherit' },
  containterStyles: {},
  disabled: true
};

export default FieldLabel;
