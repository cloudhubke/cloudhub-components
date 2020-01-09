import React from 'react';
import { sizes } from 'theme';
import { Text, Button, Block } from 'cloudhub-components';

const FieldButton = ({
  label,
  icon,
  onClick,
  height,
  buttonProps,
  style,
  textStyles,
  containterStyles,
  children,
  ...props
}) => {
  const styles = {
    button: {
      textTransform: 'none',
      padding: 0,
      height,
      ...style
    }
  };

  const renderIcon = IconComponent => {
    if (IconComponent) {
      return (
        <IconComponent
          style={{
            marginRight: sizes.margin,
            ...textStyles
          }}
        />
      );
    }
    return null;
  };

  return (
    <Block
      flex={false}
      style={{
        marginRight: sizes.margin,
        ...containterStyles
      }}
    >
      <Button onClick={onClick} style={styles.button} {...props}>
        {renderIcon(icon)}

        {label && (
          <Text cropped center style={{ ...textStyles }}>
            {label}
          </Text>
        )}
        {children}
      </Button>
      <div style={{ height: 10 }} />
    </Block>
  );
};

FieldButton.defaultProps = {
  label: '',
  height: sizes.inputHeight,
  onClick: () => {},
  textStyles: { color: 'inherit' },
  containterStyles: {}
};

export default FieldButton;
