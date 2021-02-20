const getPlacementStyles = (placement) => {
  let styles = {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 0,
    marginTop: -2,
    boxShadow: '3px 3px 5px #ccc',
  };

  if (placement === 'top') {
    styles = {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomWidth: 0,
      marginBottom: -2,
      boxShadow: '3px -3px 5px #ccc',
    };
  }

  return styles;
};

const getCustomStyles = ({
  error,
  isMulti,
  sizes,
  colors,
  style: inputStyle,
}) => {
  const borderColor = error ? colors.error : colors.gray;

  const customStyles = {
    menu: (provided, state) => {
      const placementStyles = getPlacementStyles(state.menuPlacement, colors);
      return {
        ...provided,
        zIndex: 10,
        backgroundColor: '#FFF',
        border: `1.5px solid ${colors.primary || '#2684FF'}`,
        ...placementStyles,
      };
    },

    option: (provided, state) => ({
      ...provided,
    }),

    control: (provided, state) => {
      const placement = state.selectProps.menuPlacement;
      let style = { ...inputStyle };
      if (state.isFocused) {
        style = {
          boxShadow:
            placement !== 'top' ? '3px 3px 5px #ccc' : '3px -3px 5px #ccc',
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
          ...(placement !== 'top'
            ? {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            : {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }),
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
