import React from 'react';
import Block from '../Block';
import TextInput from '../TextInput';

import AntPopper from './AntPopper';
import ThemeContext from '../theme/ThemeContext';

const FormFieldPopper = ({
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
      <AntPopper
        style={{ padding: 0, cursor: 'pointer' }}
        placement="bottomLeft"
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
        {({ onClose }) => (
          <Form
            values={val}
            onChange={(values) => {
              input.onChange(values);
            }}
            onClose={() => {
              onClose();
            }}
          />
        )}
      </AntPopper>
    </Block>
  );
};

FormFieldPopper.defaultProps = {
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

export default FormFieldPopper;
