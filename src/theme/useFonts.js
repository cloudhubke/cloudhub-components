import React from 'react';
import sizes from './Sizes';
import colors from './Colors';
import ThemeContext from './ThemeContext';

const useFonts = () => {
  const {
    fonts: {
      normalFontFamily,
      thinFontFamily,
      boldFontFamily,
      semiBoldFontFamily,
    },
  } = React.useContext(ThemeContext);

  const Fonts = {
    h1: {
      fontFamily: normalFontFamily,
      fontSize: sizes.h1,
      lineHeight: '150%',
    },
    h2: {
      fontFamily: normalFontFamily,
      fontSize: sizes.h2,
      lineHeight: '150%',
    },
    h3: {
      fontFamily: normalFontFamily,
      fontSize: sizes.h3,
      lineHeight: '150%',
    },

    h4: {
      fontFamily: normalFontFamily,
      fontSize: sizes.h4,
      lineHeight: '150%',
    },
    h5: {
      fontFamily: normalFontFamily,
      fontSize: sizes.h5,
      lineHeight: '150%',
    },
    h6: {
      fontFamily: normalFontFamily,
      fontSize: sizes.h6,
      lineHeight: '150%',
    },

    semiBold: {
      fontFamily: semiBoldFontFamily,
      lineHeight: '150%',
    },

    header: {
      fontFamily: normalFontFamily,
      fontSize: sizes.header,
      lineHeight: '150%',
      letterSpacing: 0.5,
      color: colors.black,
    },
    subHeader: {
      fontFamily: thinFontFamily,
      fontSize: sizes.subHeader,
      lineHeight: '150%',
      letterSpacing: 0.5,
      color: colors.black,
    },

    title: {
      fontFamily: normalFontFamily,
      fontSize: sizes.title,
      lineHeight: '150%',
      letterSpacing: 0.5,
      color: colors.black,
    },

    subTitle: {
      fontFamily: thinFontFamily,
      fontSize: sizes.subTitle,
      lineHeight: '150%',
      letterSpacing: 0.5,
      color: colors.black,
    },

    semibold: {
      fontFamily: boldFontFamily,
      fontWeight: 100,
    },

    bold: {
      fontFamily: boldFontFamily,
    },

    light: {
      fontFamily: thinFontFamily,
    },

    normal: {
      fontFamily: normalFontFamily,
    },

    default: {
      fontFamily: normalFontFamily,
      fontSize: sizes.body,
    },

    body: {
      fontFamily: normalFontFamily,
      fontSize: sizes.body,
      lineHeight: '200%',
      color: colors.darkGray,
    },

    caption: {
      fontSize: sizes.caption,
    },
    small: {
      fontSize: sizes.small,
      lineHeight: '200%',
      color: colors.darkGray,
    },
    button: {
      fontSize: sizes.button,
      color: colors.white,
    },
  };

  return {
    Fonts,
    fonts: Fonts,
  };
};

export default useFonts;
