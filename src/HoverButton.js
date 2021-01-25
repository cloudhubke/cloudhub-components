import React from 'react';
import { ChevronRight } from '@material-ui/icons';
import Block from './Block';
import Text from './Text';
import hexToRgb from './theme/hexToRgb';
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
  small,
  children,
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
      padding={padding || padding === 0 ? padding : sizes.padding / 2}
      margin={margin || 0}
      onMouseEnter={() => sethover(true)}
      onMouseLeave={() => sethover(false)}
      color={hover ? buttonhovercolor : buttoncolor}
      style={
        hover
          ? {
              border: `1px solid ${hoverBorderColor || 'white'}`,
              height: small
                ? sizes.icons.medium
                : sizes.inputHeight || 'min-content',
              borderRadius: sizes.buttonRadius,
              cursor: 'pointer',
              fontWeight: bold ? 700 : 500,
              color: textHoverColor || colors.milkyWhite,
              whiteSpace: small ? 'nowrap' : 'normal',
              ...(hoverStyle || {}),
            }
          : {
              border: `1px solid ${borderColor || 'black'}`,
              height: small
                ? sizes.icons.medium
                : sizes.inputHeight || 'min-content',
              borderRadius: sizes.buttonRadius,
              cursor: 'pointer',
              fontWeight: bold ? 700 : 500,
              color: textColor || colors.dark,
              whiteSpace: small ? 'nowrap' : 'normal',
              ...(style || {}),
            }
      }
      {...props}
    >
      {prefix || null}

      <Block padding={[0, sizes.padding]} style={{ overflow: 'hidden' }}>
        {children || text}
      </Block>

      {suffix || suffix === null ? (
        suffix
      ) : (
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
