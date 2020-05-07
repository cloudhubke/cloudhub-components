import React from 'react';
import Block from './Block';
import Text from './Text';
import { sizes, colors, hexToRgb } from './theme';

const HoverButton = ({
  text,
  fontSize,
  textColor,
  textHoverColor,
  prefix,
  suffix,
  color,
  hoverColor,
  borderColor,
  hoverBorderColor,
  flex,
  style,
  hoverStyle,
  bold,
  padding,
  margin,
  ...props
}) => {
  const [hover, sethover] = React.useState(false);
  const buttoncolor = color || colors.milkyWhite;
  const buttonhovercolor = hoverColor || `rgb(${hexToRgb(colors.dark)}, 0.5)`;
  return (
    <Block
      row
      space="between"
      middle
      flex={flex}
      padding={padding || sizes.padding / 2}
      margin={margin || 0}
      onMouseEnter={() => sethover(true)}
      onMouseLeave={() => sethover(false)}
      color={hover ? buttonhovercolor : buttoncolor}
      style={
        hover
          ? {
              border: `1px solid ${hoverBorderColor || 'white'}`,
              height: 'min-content',
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: bold ? 700 : 500,
              fontSize: fontSize ? fontSize : sizes.h6,
              color: textHoverColor || colors.milkyWhite,
              ...(hoverStyle || {}),
            }
          : {
              border: `1px solid ${borderColor || 'black'}`,
              height: 'min-content',
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: bold ? 700 : 500,
              fontSize: fontSize ? fontSize : sizes.h6,
              color: textColor || colors.dark,
              ...(style || {}),
            }
      }
      {...props}
    >
      {prefix ? prefix : null}
      {text ? (
        <Block padding={[0, sizes.padding]}>
          <Text
            size={fontSize ? fontSize : sizes.h6}
            bold={bold || false}
            color={
              hover
                ? textHoverColor || colors.milkyWhite
                : textColor || colors.dark
            }
          >
            {text}
          </Text>{' '}
        </Block>
      ) : null}
      {suffix ? suffix : null}
    </Block>
  );
};

export default HoverButton;
