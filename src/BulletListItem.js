import React from 'react';
import { ChevronRight } from '@mui/icons-material';
import Block from './Block';
import ThemeContext from './theme/ThemeContext';

const BulletListItem = ({
  bulletColor,
  color,
  chevron,
  arrow,
  square,
  diamonds,
  bullet,
  clubs,
  spades,
  hearts,
  margin,
  padding,
  style,
  flex,
  ...props
}) => {
  const { sizes } = React.useContext(ThemeContext);

  const bulletSymbol = () => {
    if (chevron) {
      return (
        <ChevronRight
          style={{
            fontSize: sizes.body,
            marginRight: sizes.baseMargin / 2,
            color: bulletColor,
          }}
        />
      );
    }
    if (arrow) {
      return (
        <span
          style={{
            fontSize: sizes.body,
            marginRight: sizes.baseMargin / 2,
            color: bulletColor,
          }}
        >
          &rarr;
        </span>
      );
    }
    if (clubs) {
      return (
        <span
          style={{
            fontSize: sizes.body,
            marginRight: sizes.baseMargin / 2,
            color: bulletColor,
          }}
        >
          &clubs;
        </span>
      );
    }
    if (spades) {
      return (
        <span
          style={{
            fontSize: sizes.body,
            marginRight: sizes.baseMargin / 2,
            color: bulletColor,
          }}
        >
          &spades;
        </span>
      );
    }
    if (diamonds) {
      return (
        <span
          style={{
            fontSize: sizes.body,
            marginRight: sizes.baseMargin / 2,
            color: bulletColor,
          }}
        >
          &diams;
        </span>
      );
    }
    if (hearts) {
      return (
        <span
          style={{
            fontSize: sizes.body,
            marginRight: sizes.baseMargin / 2,
            color: bulletColor,
          }}
        >
          &hearts;
        </span>
      );
    }
    if (bullet) {
      return (
        <span
          style={{
            fontSize: sizes.body,
            marginRight: sizes.baseMargin / 2,
            color: bulletColor,
          }}
        >
          &bull;
        </span>
      );
    }
    return (
      <span
        style={{
          fontSize: sizes.body,
          marginRight: sizes.baseMargin / 2,
        }}
      />
    );
  };
  return (
    <Block
      row
      middle
      margin={margin}
      padding={padding}
      color={color}
      style={style}
      flex={flex}
      {...props}
    >
      {bulletSymbol()}
      {props.children}
    </Block>
  );
};

export default BulletListItem;
