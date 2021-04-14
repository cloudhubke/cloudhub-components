import { alpha, fade } from '@material-ui/core/styles';
import getPalette from './palettes';

const alphaFn = alpha || fade;
// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
};

// prettier-ignore
const GREY = {
  '0': '#FFFFFF',
  '100': '#F9FAFB',
  '200': '#F4F6F8',
  '300': '#DFE3E8',
  '400': '#C4CDD5',
  '500': '#919EAB',
  '600': '#637381',
  '700': '#454F5B',
  '800': '#212B36',
  '900': '#161C24',
  '500_8': alphaFn('#919EAB', 0.08),
  '500_12': alphaFn('#919EAB', 0.12),
  '500_16': alphaFn('#919EAB', 0.16),
  '500_24': alphaFn('#919EAB', 0.24),
  '500_32': alphaFn('#919EAB', 0.32),
  '500_48': alphaFn('#919EAB', 0.48),
  '500_56': alphaFn('#919EAB', 0.56),
  '500_80': alphaFn('#919EAB', 0.8)
};

const getColors = (colors, paletteType = 'green') => {
  const { PRIMARY, SECONDARY, ALTERNATE } = getPalette({ paletteType });
  const {
    primaryColors,
    secondaryColors,
    tertiaryColors,
    textColors,
    backgroundColors,
  } = colors || {};

  const GRADIENTS = {
    primary: createGradient(PRIMARY.light, PRIMARY.main),
    info: createGradient(INFO.light, INFO.main),
    success: createGradient(SUCCESS.light, SUCCESS.main),
    warning: createGradient(WARNING.light, WARNING.main),
    danger: createGradient(ERROR.light, ERROR.main),
    error: createGradient(ERROR.light, ERROR.main),
  };

  const COMMON = {
    common: { black: '#000', white: '#fff' },
    primary: { ...PRIMARY, contrastText: '#fff', ...primaryColors },
    secondary: { ...SECONDARY, contrastText: '#fff', ...secondaryColors },
    tertiary: { ...tertiaryColors },
    alternate: { main: '#f7f9fc', dark: '#edf1f7', ...ALTERNATE },
    background: { ...backgroundColors },
    text: { ...textColors },
    info: { ...INFO, contrastText: '#fff' },
    success: { ...SUCCESS, contrastText: GREY['800'] },
    warning: { ...WARNING, contrastText: GREY['800'] },
    danger: { ...ERROR, contrastText: '#fff' },
    error: { ...ERROR, contrastText: '#fff' },
    grey: GREY,
    gradients: GRADIENTS,
    divider: GREY['500_24'],
    action: {
      hover: GREY['500_8'],
      selected: GREY['500_16'],
      disabled: GREY['500_80'],
      disabledBackground: GREY['500_24'],
      focus: GREY['500_24'],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  };

  return COMMON;
};

export const getLightColors = (colors) => {
  return {
    ...getColors(colors),
    mode: 'light',
    text: {
      primary: GREY['800'],
      secondary: GREY['600'],
      disabled: GREY['500'],
    },
    background: {
      paper: '#fff',
      default: '#fff',
      neutral: GREY['200'],
    },
    action: {
      active: GREY['600'],
      ...getColors(colors).action,
    },
  };
};

// DARK MODE
export const getDarkColors = (colors) => {
  return {
    ...getColors(colors),
    mode: 'dark',
    text: {
      primary: '#fff',
      secondary: GREY['500'],
      disabled: GREY['600'],
    },
    background: {
      paper: GREY['800'],
      default: GREY['900'],
      neutral: GREY['500_16'],
      level2: '#333',
      level1: '#2D3748',
    },
    action: {
      active: GREY['500'],
      ...getColors(colors).action,
    },
  };
};
