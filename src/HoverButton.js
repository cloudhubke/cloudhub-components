import React from 'react';
import { ChevronRight } from '@material-ui/icons';
import Block from './Block';
import Text from './Text';
import { hexToRgb } from './theme';
import ThemeContext from './theme/ThemeContext';

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
  const { fonts, sizes, colors } = React.useContext(ThemeContext);

  const buttonhovercolor = hoverColor || `rgb(${hexToRgb(colors.dark)}, 0.5)`;
  const buttoncolor = color || colors.milkyWhite;

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
              ...fonts.button,
              border: `1px solid ${hoverBorderColor || 'white'}`,
              height: sizes.inputHeight || 'min-content',
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: bold ? 700 : 500,
              fontSize: fontSize || sizes.h6,
              color: textHoverColor || colors.milkyWhite,
              ...(hoverStyle || {}),
            }
          : {
              ...fonts.button,
              border: `1px solid ${borderColor || 'black'}`,
              height: sizes.inputHeight || 'min-content',
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: bold ? 700 : 500,
              color: textColor || colors.dark,
              ...(style || {}),
            }
      }
      {...props}
    >
      {prefix || null}
      {text ? (
        <Block padding={[0, sizes.padding]}>
          <Text
            size={fontSize || sizes.h6}
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
      {suffix || (
        <ChevronRight
          style={{
            color: hover ? textHoverColor : textColor,
            marginLeft: flex ? 'auto' : sizes.doubleBaseMargin,
          }}
        />
      )}
    </Block>
  );
};

export default HoverButton;
