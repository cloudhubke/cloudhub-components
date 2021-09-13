import React from 'react';
import clsx from 'clsx';
import { Card, CardContent, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Scrollbars from '../Scrollbars';
import CardToolbar from './CardToolbar';
import Block from '../Block';
import Text from '../Text';

const useStyles = makeStyles((theme) => ({
  footerActionsComponent: {
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

const ScrollableCard = ({
  children,
  headerActionsComponent,
  footerActionsComponent,
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
          {headerActionsComponent}
        </Block>
      </CardToolbar>
      <CardContent>
        <Scrollbars className={`scroll-area-${size}`} {...props}>
          {children}
        </Scrollbars>
      </CardContent>

      {cardActions && <CardActions>{cardActions}</CardActions>}
      {footerActionsComponent && (
        <div className={classes.footerActionsComponent}>
          {footerActionsComponent}
        </div>
      )}
    </Card>
  );
};

export default ScrollableCard;
