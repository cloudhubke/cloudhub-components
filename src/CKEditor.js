import React from 'react';
import CKEditor5 from 'react-ckeditor5';
import { makeStyles } from '@material-ui/core/styles';
import Block from './Block';
import Text from './Text';
import { useFonts, colors } from './theme';

const styles = ({ height }) => {
  const { fonts } = useFonts();
  const useStyles = makeStyles({
    root: {
      '& .ck-editor__editable': {
        height,
        maxHeight: 800,
        ...fonts.body,
        color: colors.dark,
      },
    },
  });

  return {
    useStyles,
  };
};
const CKEditor = props => {
  const { meta, ...rest } = props;
  const classes = styles(props).useStyles();

  return (
    <Block className={classes.root}>
      <CKEditor5 {...rest} />
      {props.meta.touched && props.meta.error && (
        <Text error>{props.meta.error}</Text>
      )}
    </Block>
  );
};

CKEditor.defaultProps = {
  meta: {},
  height: 400,
};

export default CKEditor;
