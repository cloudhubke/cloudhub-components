import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import EditorToolbar, {
  formats,
  redoChange,
  undoChange
} from './EditorToolbar';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${theme.palette.grey['500_32']}`,
    '& .ql-container': {
      border: 'none',
      ...theme.typography.body1,
      fontFamily: theme.typography.fontFamily
    },
    '& .ql-editor': {
      minHeight: 200,
      '&.ql-blank::before': {
        fontStyle: 'normal',
        color: theme.palette.text.disabled
      },
      '& pre.ql-syntax': {
        ...theme.typography.body2,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.grey['900']
      }
    }
  },
  error: { border: `solid 1px ${theme.palette.error.main}` }
}));

// ----------------------------------------------------------------------

QuillEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  simple: PropTypes.bool,
  className: PropTypes.string
};

function QuillEditor({
  id,
  error,
  value,
  onChange,
  simple = false,
  className,
  ...other
}) {
  const classes = useStyles();

  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: { undo: undoChange, redo: redoChange }
    },
    history: { delay: 500, maxStack: 100, userOnly: true },
    syntax: true,
    clipboard: { matchVisual: false }
  };

  return (
    <div className={clsx(classes.root, { [classes.error]: error }, className)}>
      <EditorToolbar id={id} isSimple={simple} />
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write something awesome..."
        {...other}
      />
    </div>
  );
}

export default QuillEditor;
