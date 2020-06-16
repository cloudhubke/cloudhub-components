import * as React from 'react';
import { StatefulPopover } from 'baseui/popover';
import { useRect } from '@reach/rect';
// import { Button } from 'baseui/button';
import Button from '../Button';
import Input from '../Input';
import Block from '../Block';
import useRectHook from '../customhooks/useRectHook.js';
import ThemeContext from '../theme/ThemeContext';

let rect = {};

const BaseWebPopover = ({
  anchorComponent,
  children,
  triggerType,
  arrow,
  paperStyle,
  containerStyle,
  overrides,
  open,
  placement,
  ...props
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);
  const anchorRef = React.useRef();
  rect = useRect(anchorRef) || {};
  //   rect = useRect(anchorRef, !rect.height) || {};

  const [isOpen, setIsOpen] = React.useState(open);

  const paperStyles = {
    width: rect.width || 0,
    minHeight: rect.height,
    overflowY: 'hidden',
    display: 'flex',
    ...paperStyle,
  };

  const Content = ({ close }) => {
    if (typeof children === 'function') {
      return children({ rect, onClose: close });
    }

    return React.cloneElement(children, {
      ...children.props,
      onClose: close,
      style: { ...paperStyles, ...children.props.style },
    });
  };

  const AnchorElement = React.forwardRef((props, ref) => {
    if (typeof anchorComponent === 'function') {
      return anchorComponent();
    }

    return React.cloneElement(anchorComponent, {
      ...anchorComponent.props,
      ...props,
      style: { margin: 0, ...anchorComponent.props.style },
      ref,
    });
  });

  const offset = {
    ...(placement === 'bottomLeft' || placement === 'topLeft'
      ? { left: sizes.padding }
      : {}),
  };

  return (
    <div
      ref={anchorRef}
      style={{
        float: 'left',
        display: 'inline-block',
        flex: 0,
        backgroundColor: 'cyan',
        ...containerStyle,
      }}
    >
      <StatefulPopover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={Content}
        returnFocus
        autoFocus
        triggerType={triggerType}
        showArrow={arrow}
        placement={placement}
        overrides={{
          Arrow: {
            style: {
              //   backgroundColor: 'white',
              //   border: `${sizes.padding}px solid ${colors.white}`,
              ...(overrides.Arrow ? overrides.Arrow.style : {}),
            },
            props: {
              $arrowOffset: {
                ...offset,
              },
              ...(overrides.Arrow ? overrides.Arrow.props : {}),
            },
            ...overrides.Arrow,
          },
          Body: {
            style: {
              backgroundColor: 'transparent',
              ...(overrides.Body ? overrides.Body.style : {}),
            },
          },
          Inner: {
            style: {
              backgroundColor: 'transparent',
              ...(overrides.Inner ? overrides.Inner.style : {}),
            },
          },
        }}
        {...props}
      >
        <div style={{ cursor: 'pointer' }}>
          <AnchorElement />
        </div>
      </StatefulPopover>
    </div>
  );
};

BaseWebPopover.defaultProps = {
  anchorComponent: null,
  open: false,
  arrow: true,
  paperStyle: {},
  placement: 'bottomLeft',
  triggerType: 'click',
  overrides: {
    Arrow: {},
    Body: {},
    Inner: {},
  },
};

export default BaseWebPopover;

//     overrides={{
//       Arrow: {
//         style: (props) => {
//           console.log('====================================');
//           console.log('PROPS', props);
//           console.log('====================================');
//           return {
//             backgroundColor: colors.gray2,
//             // border: `${sizes.padding}px solid ${colors.gray2}`,
//           };
//         },
//         props: {
//           $arrowOffset: {
//             left: sizes.padding,
//           },
//         },
//       },
//       Body: {
//         style: () => ({
//           marginTop: `${sizes.padding}px`,
//         }),
//       },
//       Inner: {
//         style: {},
//       },
//     }}
