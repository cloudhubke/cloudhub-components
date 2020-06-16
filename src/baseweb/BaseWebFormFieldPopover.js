import React from 'react';
import Block from '../Block';
import TextInput from '../TextInput';

import BaseWebPopover from './BaseWebPopover';
import ThemeContext from '../theme/ThemeContext';

const BaseWebFormFieldPopover = ({
  arrowStyle,
  inputProps,
  input,
  labelExtractor,
  Form,
  anchorComponent: AnchorComponent,
  ...props
}) => {
  // const [val] = React.useState(input.values || {});
  const { colors } = React.useContext(ThemeContext);
  const val = input.value || {};

  const [text, setText] = React.useState(labelExtractor(val));

  React.useEffect(() => {
    setText(labelExtractor(val));
  }, [val]);

  return (
    <Block>
      <BaseWebPopover
        placement="bottomLeft"
        arrow
        anchorComponent={
          AnchorComponent ? (
            <AnchorComponent value={text} {...inputProps} />
          ) : (
            <TextInput
              value={text}
              showRemove
              paper
              inputStyle={{ pointerEvents: 'none', cursor: 'pointer' }}
              placeholder="Select..."
              {...inputProps}
            />
          )
        }
        arrowStyle={{ backgroundColor: colors.gray2, ...arrowStyle }}
        {...props}
      >
        {({ onClose, rect }) => (
          <Form
            rect={rect}
            values={val}
            onChange={(values) => {
              input.onChange(values);
            }}
            onClose={() => {
              onClose();
            }}
          />
        )}
      </BaseWebPopover>
    </Block>
  );
};

BaseWebFormFieldPopover.defaultProps = {
  input: {
    values: {},
    onChange: () => null,
  },
  labelExtractor: (item) => `${item}`,
  inputProps: {
    placeholder: 'Select...',
  },
  arrowStyle: {},
  Form: () => null,
};

export default BaseWebFormFieldPopover;
