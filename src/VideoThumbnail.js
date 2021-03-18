import React from 'react';
import { ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { PlayArrow, PlayCircleOutline } from '@material-ui/icons';
import moment from 'moment';
import Block from './Block';
import Text from './Text';
import Avatar from './Avatar';
import ThemeContext from './theme/ThemeContext';

const VideoThumbnail = ({
  thumbnail,
  small,
  medium,
  large,
  list,
  card,
  width,
  height,
  length,
  borderWidth,
  borderColor,
  color,
  margin,
  padding,
  flex,
  showplayicon,
  playicon,
  title,
  subTitle,
  author,
  avatar,
  posted,
  views,
  outlineicon,
  style,
  ...props
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);
  const thumbWidth = () => {
    if (width) return width;
    if (height && !width) return Math.round((height * 16) / 9);
    if (small) return 128;
    if (medium) return 192;
    if (large) return 256;
    return 192;
  };
  const thumbHeight = () => {
    if (height) return height;
    if (width && !height) return Math.round((width * 9) / 16);
    if (small) return 72;
    if (medium) return 108;
    if (large) return 144;
    return 108;
  };
  const divHeight = () => {
    const baseHeight = thumbHeight();
    if (card) return 'auto';
    if (padding) {
      if (Array.isArray(padding)) {
        switch (padding.length) {
          case 1: {
            return baseHeight + padding[0] * 2 + 2 * (borderWidth || 1);
          }
          case 2: {
            return baseHeight + padding[0] * 2 + 2 * (borderWidth || 1);
          }
          case 4: {
            return (
              baseHeight + padding[0] + padding[2] + 2 * (borderWidth || 1)
            );
          }
          default:
            return thumbHeight();
        }
      }
    }
  };

  const divWidth = () => {
    const baseWidth = thumbWidth();
    if (list) return 'auto';
    if (padding) {
      if (Array.isArray(padding)) {
        switch (padding.length) {
          case 1: {
            return baseWidth + padding[0] * 2 + 2 * (borderWidth || 1);
          }
          case 2: {
            return baseWidth + padding[1] * 2 + 2 * (borderWidth || 1);
          }
          case 4: {
            return baseWidth + padding[1] + padding[3] + 2 * (borderWidth || 1);
          }
          default:
            return thumbWidth();
        }
      }
    }
    return thumbWidth();
  };

  const showViews = () => {
    if (typeof views === 'number') {
      if (views < 1000) return `${views} Views`;
      if (views > 1000 && views < 10000) {
        return `${(views / 1000).toFixed(1)}K Views`;
      }
      if (views > 10000 && views < 1000000) {
        return `${(views / 1000).toFixed(0)}K Views`;
      }
      if (views > 1000000 && views < 10000000) {
        return `${(views / 1000000).toFixed(1)}M Views`;
      }
      if (views > 10000000 && views < 1000000000) {
        return `${(views / 1000000).toFixed(0)}M Views`;
      }
    }
    return '';
  };

  const duration = () => {
    if (length) {
      if (typeof length === 'number') {
        return `${length > 3599 ? `${(length / 3600).toFixed(0)}:` : ''}${(
          (length % 3600) /
          60
        ).toFixed(0)}:${(length % 60).toFixed(0)}`;
      }
    }
    return '';
  };
  return (
    <Block
      margin={margin || 0}
      padding={padding || 0}
      paper
      row={list}
      style={{
        height: divHeight(),
        width: divWidth(),
        cursor: 'pointer',
        ...(style || {}),
      }}
      flex={list ? flex : false}
      {...props}
    >
      <Block
        flex={false}
        middle
        center
        style={{
          width: thumbWidth(),
          height: thumbHeight(),
          backgroundImage: `url(${thumbnail})`,
          backgroundSize: 'cover',
          border: `${borderWidth || 1}px solid ${
            borderColor || colors.milkyWhite
          }`,
        }}
      >
        {showplayicon &&
          (playicon ||
            (outlineicon ? (
              <PlayCircleOutline style={{ color: colors.milkyWhite }} />
            ) : (
              <PlayArrow style={{ color: colors.milkyWhite }} />
            )))}
        {!list && !card && (
          <Text body bold milkyWhite>
            {title}
          </Text>
        )}
        {!list && length && (
          <Block
            flex={false}
            style={{ position: 'absolute', right: 0, bottom: 0 }}
            color={colors.dark}
          >
            <Text body milkyWhite>
              {duration()}
            </Text>
          </Block>
        )}
      </Block>
      {list && (
        <Block
          middle
          padding={[sizes.padding / 2, sizes.padding * 2]}
          color={color || colors.milkyWhite}
        >
          {length && (
            <Block
              flex={false}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
              }}
              color={colors.dark}
            >
              <Text body milkyWhite>
                {duration()}
              </Text>
            </Block>
          )}
          {title && <Text bold>{title}</Text>}
          {subTitle && (
            <Text body semibold>
              {subTitle}
            </Text>
          )}
        </Block>
      )}
      {card && (
        <ListItem dense>
          <ListItemAvatar>
            <Avatar alt="Author" src={avatar || ''} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Text h6 bold>
                {title}
              </Text>
            }
            secondary={
              <Block>
                {author && <Text>{author}</Text>}
                {(views || posted) && (
                  <Block row style={{ matrginLeft: 'auto' }}>
                    {views && <Text body>{showViews()}</Text>}
                    {views && posted && <> &bull; </>}
                    {posted && <Text body>{moment(posted).fromNow(true)}</Text>}
                  </Block>
                )}
              </Block>
            }
          />
        </ListItem>
      )}
    </Block>
  );
};

export default VideoThumbnail;
