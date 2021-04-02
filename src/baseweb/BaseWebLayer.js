import React from 'react';
import { Layer } from 'baseui/layer';
import { useStyletron } from 'baseui';
import Block from '../Block';

function Wrapper(props) {
  const [css] = useStyletron();
  const { children, forwardedRef } = props;
  return (
    <div
      className={css({
        position: 'fixed',
        backgroundColor: 'cyan',
        zIndex: 1,
      })}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
}

const BaseWebLayer = ({ children, ...props }) => {
  const containerRef = React.useRef();
  const [updated, setForceUpdate] = React.useState(false);

  return (
    <Block
      ref={(node) => {
        containerRef.current = node;
        if (!updated) {
          setForceUpdate(Date.now());
        }
      }}
    >
      {containerRef.current && (
        <Layer mountNode={containerRef.current} {...props}>
          <Wrapper>{children}</Wrapper>
        </Layer>
      )}
    </Block>
  );
};

export default BaseWebLayer;
