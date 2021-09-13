import React from 'react';
import CKEditor5 from 'react-ckeditor5';
import { makeStyles } from '@mui/styles';
import Block from './Block';
import Text from './Text';

import ThemeContext from './theme/ThemeContext';

const styles = ({ height, fonts, colors }) => {
  const useStyles = makeStyles({
    root: {
      '& .ck.ck-editor': {
        width: '100%',
      },
      '& .ck.ck-editor__main': {
        height: '100%',
        maxHeight: height || '100%',
        ...fonts.body,
        color: colors.dark,
      },
      '& .ck.ck-editor__main>.ck-editor__editable': {
        height: 'calc(100% - 55px)',
        maxHeight: height || '100%',
        ...fonts.body,
        color: colors.dark,
      },
    },
  });

  return {
    useStyles,
  };
};
const CKEditor = ({ meta, height, containterStyle, ...rest }) => {
  const { fonts, colors } = React.useContext(ThemeContext);

  const classes = styles({ height, colors, fonts }).useStyles();

  return (
    <Block flex={false} style={{ height }}>
      <Block style={{ position: 'relative', ...containterStyle }}>
        <Block absolute className={classes.root}>
          <CKEditor5 {...rest} />
        </Block>
      </Block>
      <div>{meta.touched && meta.error && <Text error>{meta.error}</Text>}</div>
    </Block>
  );
};

CKEditor.defaultProps = {
  meta: {},
  height: '100%',
};

export default CKEditor;
