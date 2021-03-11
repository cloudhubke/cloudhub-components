import React from 'react';
import { useRect } from '@reach/rect';
import AntPopOver from './AntPopOver';

const AntPopper = ({
  arrow,
  placement,
  disableportal,
  flip,
  preventOverflow,
  open,
  onClose,
  color,
  children,
  anchorComponent,
  style,
  paperStyle,
  onOpen,
  ...rest
}) => {
  const anchorRef = React.useRef();
  const rect = useRect(anchorRef, false) || {};
  const [popperopen, setPopperOpen] = React.useState(open);

  const paperStyles = {
    ...(color ? { backgroundColor: color } : {}),
    width: rect.width || 0,
    minHeight: rect.height,
    overflowY: 'hidden',
    ...paperStyle,
  };

  const onClosePopper = () => {
    setPopperOpen(false);
  };

  const Content = () => {
    if (!children) {
      return null;
    }

    if (typeof children === 'function') {
      return children({ rect, onClose: onClosePopper });
    }

    return React.cloneElement(children, {
      ...children.props,
      onClose: onClosePopper,
      style: { ...paperStyles, ...children.props.style },
    });
  };

  const AnchorElement = React.forwardRef((props, ref) => {
    if (!AnchorElement) {
      return null;
    }
    if (typeof anchorComponent === 'function') {
      return anchorComponent();
    }

    return React.cloneElement(anchorComponent, {
      ...anchorComponent.props,
      ...props,
      ref,
    });
  });

  return (
    <div style={{ width: 'auto', cursor: 'pointer' }} ref={anchorRef}>
      <AntPopOver
        content={<Content />}
        trigger="click"
        placement={placement}
        getPopupContainer={(trigger) => trigger.parentNode}
        style={{ marginTop: -10 }}
        padding={5}
        arrowStyle={{}}
        containerStyle={{ padding: 0 }}
        visible={popperopen}
        onVisibleChange={(visible) => setPopperOpen(visible)}
        {...rest}
      >
        <AnchorElement />
      </AntPopOver>
    </div>
  );
};

AntPopper.defaultProps = {
  arrow: true,
  open: false,
  placement: 'bottomRight',
  preventOverflow: 'disabled',
  paperstyles: {},
  onClose: () => {},
  anchorComponent: null,
  disableClickAwayClose: false,
  paperStyle: {},
  onOpen: () => null,
};
export default AntPopper;
