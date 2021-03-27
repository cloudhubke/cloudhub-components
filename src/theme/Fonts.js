import sizes from './Sizes';
import colors from './Colors';

const Fonts = {
  h1: {
    fontFamily: 'Montserrat',
    fontSize: sizes.h1,
    lineHeight: '150%',
  },
  h2: {
    fontFamily: 'Montserrat',
    fontSize: sizes.h2,
    lineHeight: '150%',
  },
  h3: {
    fontFamily: 'Montserrat',
    fontSize: sizes.h3,
    lineHeight: '150%',
  },
  h4: {
    fontFamily: 'Montserrat',
    fontSize: sizes.h4,
    lineHeight: '150%',
  },
  h5: {
    fontFamily: 'Montserrat',
    fontSize: sizes.h5,
    lineHeight: '150%',
  },
  h6: {
    fontFamily: 'Montserrat',
    fontSize: sizes.h6,
    lineHeight: '150%',
  },

  header: {
    fontFamily: 'Montserrat',
    fontSize: sizes.header,
    lineHeight: '150%',
    letterSpacing: 0.5,
    fontWeight: 700,
  },
  subHeader: {
    fontFamily: 'Montserrat',
    fontSize: sizes.subHeader,
    lineHeight: '150%',
    letterSpacing: 0.5,
    fontWeight: 500,
  },

  title: {
    fontFamily: 'Montserrat',
    fontSize: sizes.title,
    lineHeight: '150%',
    letterSpacing: 0.5,
    fontWeight: 700,
  },

  subTitle: {
    fontFamily: 'clanpro-thin',
    fontSize: sizes.subTitle,
    lineHeight: '150%',
    letterSpacing: 0.5,
    fontWeight: 400,
  },

  semibold: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
  },

  bold: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
  },

  light: {
    fontFamily: 'Montserrat',
  },

  italic: {
    fontStyle: 'italic',
  },
  strikethrough: {
    textDecoration: 'line-through',
  },
  underline: {
    textDecoration: 'underline',
  },

  normal: {
    fontFamily: 'Montserrat',
  },

  default: {
    fontFamily: 'Montserrat',
    fontSize: sizes.body,
  },

  body: {
    fontFamily: 'Montserrat',
    fontSize: sizes.body,
    lineHeight: '200%',
    color: colors.darkGray,
  },

  caption: {
    fontSize: sizes.caption,
  },
  small: {
    fontSize: sizes.small,
    fontWeight: 500,
    lineHeight: '200%',
  },
  button: {
    fontSize: sizes.button,
  },
};

export default Fonts;
