import React from 'react';
import Button from './Button';
import Text from './Text';
import Block from './Block';
import { sizes as libsizes } from './theme';
import ThemeContext from './theme/ThemeContext';

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
  const { sizes } = React.useContext(ThemeContext);
  const styles = {
    button: {
      textTransform: 'none',
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
  height: libsizes.inputHeight,
  onClick: () => {},
  textStyles: { color: 'inherit' },
  containterStyles: {}
};

export default FieldButton;
