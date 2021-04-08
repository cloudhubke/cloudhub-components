import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Quill } from 'react-quill';
import { Icon } from '@iconify/react';
import ReactDOMServer from 'react-dom/server';
import codeFill from '@iconify-icons/eva/code-fill';
import roundUndo from '@iconify-icons/ic/round-undo';
import roundRedo from '@iconify-icons/ic/round-redo';
import link2Fill from '@iconify-icons/eva/link-2-fill';
import image2Fill from '@iconify-icons/eva/image-2-fill';
import roundSubscript from '@iconify-icons/ic/round-subscript';
import roundFunctions from '@iconify-icons/ic/round-functions';
import roundFormatBold from '@iconify-icons/ic/round-format-bold';
import roundSuperscript from '@iconify-icons/ic/round-superscript';
import roundLocalMovies from '@iconify-icons/ic/round-local-movies';
import roundFormatQuote from '@iconify-icons/ic/round-format-quote';
import roundFormatClear from '@iconify-icons/ic/round-format-clear';
import roundFormatItalic from '@iconify-icons/ic/round-format-italic';
import roundFormatColorFill from '@iconify-icons/ic/round-format-color-fill';
import roundFormatColorText from '@iconify-icons/ic/round-format-color-text';
import roundFormatAlignLeft from '@iconify-icons/ic/round-format-align-left';
import roundFormatUnderlined from '@iconify-icons/ic/round-format-underlined';
import roundFormatAlignRight from '@iconify-icons/ic/round-format-align-right';
import roundFormatAlignCenter from '@iconify-icons/ic/round-format-align-center';
import roundFormatListBulleted from '@iconify-icons/ic/round-format-list-bulleted';
import roundFormatListNumbered from '@iconify-icons/ic/round-format-list-numbered';
import roundFormatAlignJustify from '@iconify-icons/ic/round-format-align-justify';
import roundFormatStrikethrough from '@iconify-icons/ic/round-format-strikethrough';
import roundFormatIndentDecrease from '@iconify-icons/ic/round-format-indent-decrease';
import roundFormatIndentIncrease from '@iconify-icons/ic/round-format-indent-increase';
import roundFormatTextdirectionLToR from '@iconify-icons/ic/round-format-textdirection-l-to-r';
import roundFormatTextdirectionRToL from '@iconify-icons/ic/round-format-textdirection-r-to-l';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const FONT_FAMILY = ['Roboto', 'Raleway', 'Montserrat', 'Lato', 'Rubik'];

const FONT_SIZE = [
  '8px',
  '9px',
  '10px',
  '12px',
  '14px',
  '16px',
  '20px',
  '24px',
  '32px',
  '42px',
  '54px',
  '68px',
  '84px',
  '98px'
];
const HEADINGS = [
  'Heading 1',
  'Heading 2',
  'Heading 3',
  'Heading 4',
  'Heading 5',
  'Heading 6'
];

const Size = Quill.import('attributors/style/size');
Size.whitelist = FONT_SIZE;
Quill.register(Size, true);

const Font = Quill.import('attributors/style/font');
Font.whitelist = FONT_FAMILY;
Quill.register(Font, true);

const Icons = Quill.import('ui/icons');
function renderIcon(icon) {
  return ReactDOMServer.renderToString(
    <Icon icon={icon} width={18} height={18} />
  );
}

Icons.bold = renderIcon(roundFormatBold);
Icons.italic = renderIcon(roundFormatItalic);
Icons.underline = renderIcon(roundFormatUnderlined);
Icons.strike = renderIcon(roundFormatStrikethrough);
Icons.link = renderIcon(link2Fill);
Icons.image = renderIcon(image2Fill);
Icons.code = renderIcon(image2Fill);
Icons['code-block'] = renderIcon(codeFill);
Icons.list.bullet = renderIcon(roundFormatListBulleted);
Icons.list.ordered = renderIcon(roundFormatListNumbered);
Icons.indent['+1'] = renderIcon(roundFormatIndentIncrease);
Icons.indent['-1'] = renderIcon(roundFormatIndentDecrease);
Icons.script.sub = renderIcon(roundSubscript);
Icons.script.super = renderIcon(roundSuperscript);
Icons.direction[''] = renderIcon(roundFormatTextdirectionLToR);
Icons.direction.rtl = renderIcon(roundFormatTextdirectionRToL);
Icons.color = renderIcon(roundFormatColorText);
Icons.background = renderIcon(roundFormatColorFill);
Icons.video = renderIcon(roundLocalMovies);
Icons.blockquote = renderIcon(roundFormatQuote);
Icons.clean = renderIcon(roundFormatClear);
Icons.formula = renderIcon(roundFunctions);
Icons.align[''] = renderIcon(roundFormatAlignLeft);
Icons.align['center'] = renderIcon(roundFormatAlignCenter);
Icons.align['justify'] = renderIcon(roundFormatAlignJustify);
Icons.align['right'] = renderIcon(roundFormatAlignRight);

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const RTL = theme.direction === 'rtl';

  return {
    root: {
      '& .ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow .ql-toolbar button:hover .ql-fill, .ql-snow.ql-toolbar button:focus .ql-fill, .ql-snow .ql-toolbar button:focus .ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill': {
        fill: theme.palette.primary.main
      },
      '& .ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected': {
        color: theme.palette.primary.main
      },
      '& .ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter': {
        stroke: theme.palette.primary.main
      },
      '& .ql-stroke': { stroke: theme.palette.text.primary },
      '& .ql-fill, .ql-stroke.ql-fill': {
        fill: theme.palette.text.primary
      },
      '& .ql-picker, .ql-picker-options, .ql-picker-item, .ql-picker-label, button': {
        '&:focus': { outline: 'none' }
      },
      '& .ql-toolbar': {
        border: 'none',
        borderBottom: `solid 1px ${theme.palette.grey['500_32']}`,
        '& .ql-formats': {
          '&:not(:last-child)': { marginRight: theme.spacing(2) }
        },
        // Button
        '& button': {
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          color: theme.palette.text.primary
        },

        // Select
        '& .ql-picker-label': {
          ...theme.typography.subtitle2,
          color: theme.palette.text.primary
        },
        '& .ql-picker-label svg': {
          right: RTL && '0 !important',
          left: RTL && 'auto !important'
        },
        '& .ql-color,& .ql-background,& .ql-align ': {
          '& .ql-picker-label': {
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        },
        '& .ql-expanded': {
          '& .ql-picker-label': {
            borderRadius: 4,
            color: theme.palette.text.disabled,
            borderColor: 'transparent !important',
            backgroundColor: theme.palette.action.focus,
            '& .ql-stroke': { stroke: theme.palette.text.disabled }
          },
          '& .ql-picker-options': {
            padding: 0,
            marginTop: 4,
            border: 'none',
            maxHeight: 200,
            overflow: 'auto',
            boxShadow: theme.shadows['25'].z20,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper
          },
          '& .ql-picker-item': {
            color: theme.palette.text.primary
          },

          // Align
          '&.ql-align': {
            '& .ql-picker-options': { padding: 0, display: 'flex' },
            '& .ql-picker-item': {
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }
          },
          // Color & Background
          '&.ql-color, &.ql-background': {
            '& .ql-picker-options': { padding: 8 },
            '& .ql-picker-item': {
              margin: 3,
              borderRadius: 4,
              '&.ql-selected': { border: 'solid 1px black' }
            }
          },
          // Font, Size, Header
          '&.ql-font, &.ql-size, &.ql-header': {
            '& .ql-picker-options': {
              padding: theme.spacing(1, 0)
            },
            '& .ql-picker-item': {
              padding: theme.spacing(0.5, 1.5)
            }
          }
        }
      }
    }
  };
});

// ----------------------------------------------------------------------

export const undoChange = () => {
  this.quill.history.undo();
};

export const redoChange = () => {
  this.quill.history.redo();
};

export const formats = [
  'align',
  'background',
  'blockquote',
  'bold',
  'bullet',
  'code',
  'code-block',
  'color',
  'direction',
  'font',
  'formula',
  'header',
  'image',
  'indent',
  'italic',
  'link',
  'list',
  'script',
  'size',
  'strike',
  'table',
  'underline',
  'video'
];

EditorToolbar.propTypes = {
  id: PropTypes.string.isRequired,
  isSimple: PropTypes.bool,
  className: PropTypes.string
};

function EditorToolbar({ id, isSimple, className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <div id={id}>
        <div className="ql-formats">
          {!isSimple && (
            <select className="ql-font" defaultValue="">
              <option value="">Font</option>
              {FONT_FAMILY.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          )}

          {!isSimple && (
            <select className="ql-size" defaultValue="16px">
              {FONT_SIZE.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          )}

          <select className="ql-header" defaultValue="">
            {HEADINGS.map((heading, index) => (
              <option key={heading} value={index + 1}>
                {heading}
              </option>
            ))}
            <option value="">Normal</option>
          </select>
        </div>

        <div className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </div>

        {!isSimple && (
          <div className="ql-formats">
            <select className="ql-color" />
            <select className="ql-background" />
          </div>
        )}

        <div className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          {!isSimple && <button className="ql-indent" value="-1" />}
          {!isSimple && <button className="ql-indent" value="+1" />}
        </div>

        {!isSimple && (
          <div className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
          </div>
        )}

        {!isSimple && (
          <div className="ql-formats">
            <button className="ql-code-block" />
            <button className="ql-blockquote" />
          </div>
        )}

        <div className="ql-formats">
          <button className="ql-direction" value="rtl" />
          <select className="ql-align" />
        </div>

        <div className="ql-formats">
          <button className="ql-link" />
          <button className="ql-image" />
          <button className="ql-video" />
        </div>

        <div className="ql-formats">
          {!isSimple && <button className="ql-formula" />}
          <button className="ql-clean" />
        </div>

        {!isSimple && (
          <div className="ql-formats">
            <button className="ql-undo">
              <Icon icon={roundUndo} width={18} height={18} />
            </button>
            <button className="ql-redo">
              <Icon icon={roundRedo} width={18} height={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditorToolbar;
