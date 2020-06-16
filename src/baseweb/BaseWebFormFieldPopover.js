import React from 'react';
import Block from '../Block';
import TextInput from '../TextInput';

import BaseWebPopover from './BaseWebPopover';
import ThemeContext from '../theme/ThemeContext';

const BaseWebFormFieldPopover = ({
  arrowStyle,
  inputProps,
  input,
  onChange,
  value,
  labelExtractor,
  Form,
  anchorComponent: AnchorComponent,
  ...props
}) => {
  const val = value || input.value;
  const { colors } = React.useContext(ThemeContext);

  const [text, setText] = React.useState(labelExtractor(val));

  const onChangeValues = (values) => {
    if (typeof input.onChange === 'function') {
      input.onChange(values);
    }

    if (typeof onChange === 'function') {
      onChange(values);
    }
  };

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
              onRemoveText={() => onChangeValues(null)}
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
            onChange={onChangeValues}
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
