import React from 'react';
import clsx from 'clsx';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CardToolbar from './CardToolbar';
import Block from '../Block';
import Text from '../Text';

const useStyles = makeStyles((theme) => ({
  actionsComponent: {
    padding: theme.sizes.padding,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  contentArea: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.sizes.padding,
    flex: 1,
  },
}));

const ScrollableBox = ({
  children,
  rightComponent,
  actionsComponent,
  cardActions,
  title = '',
  size = 'md',
  headerAction,
  cardclass,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, cardclass)}>
      <CardToolbar>
        <Block flex={false}>
          {typeof title === 'string' ? <Text header>{title}</Text> : title}
        </Block>
        <Block right row>
          {rightComponent}
        </Block>
      </CardToolbar>
      <CardContent>
        <PerfectScrollbar
          className={`scroll-area-${size}`}
          options={{ wheelPropagation: false }}
        >
          <Block padding={5} {...props}>
            {children}
          </Block>
        </PerfectScrollbar>
      </CardContent>
      {cardActions && <CardActions>{cardActions}</CardActions>}
      {actionsComponent && (
        <div className={classes.actionsComponent}>{actionsComponent}</div>
      )}
    </Card>
  );
};

export default ScrollableBox;
