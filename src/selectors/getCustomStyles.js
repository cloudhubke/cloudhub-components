import hexToRgba from 'hex-to-rgba';

const getCustomStyles = ({
  error,
  isMulti,
  sizes,
  colors,
  style: inputStyle,
}) => {
  const borderColor = error ? colors.error : colors.gray;
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 10,
      marginTop: -2,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      backgroundColor: '#FFF',
      border: `1.5px solid ${colors.primary || '#2684FF'}`,
      borderTopWidth: 0,
      boxShadow: `0 1px 0 1px ${hexToRgba(colors.primary, 0.1)}`,
    }),
    option: (provided, state) => ({
      ...provided,
    }),
    control: (provided, state) => {
      let style = { ...inputStyle };
      if (state.isFocused) {
        style = {
          boxShadow: `0 1px 0 1px ${hexToRgba(colors.primary, 0.1)}`,
          borderWidth: 1.5,
          borderColor: colors.primary || '#2684FF',
          '&:hover': {
            borderColor: colors.primary || '#2684FF',
          },
          ...style,
        };
      }

      if (state.menuIsOpen) {
        style = {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          boxShadow: '0 1px 0 1px hsla(0, 0%, 0%, 0.1)',
          borderWidth: 1.5,
          borderColor: colors.primary || '#2684FF',
          ...style,
        };
      }

      return {
        ...provided,
        ...(isMulti && { minHeight: sizes.inputHeight }),
        ...(!isMulti && { height: sizes.inputHeight }),
        borderWidth: 1,
        borderColor: borderColor || provided.borderColor,
        backgroundColor: '#FFF',
        '&:hover': {
          borderColor: colors.dark || '#333',
        },
        ...style,
      };
    },
  };

  return customStyles;
};

export default getCustomStyles;
