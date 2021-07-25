const scrollAreaStyles = (theme) => {
  return {
    '.scroll-area': { overflowX: 'hidden', height: 300 },
    '.scroll-area-xs': { height: 150, overflowX: 'hidden' },
    '.scroll-area-sm': { height: 215, overflowX: 'hidden' },
    '.scroll-area-md': { height: 300, overflowX: 'hidden' },
    '.scroll-area-lg': { height: 420, overflowX: 'hidden' },
    '.scroll-area-xl': { height: 600, overflowX: 'hidden' },
    '.scroll-area-xxl': { height: 900, overflowX: 'hidden' },
    '.scroll-area-x': { overflowX: 'auto', width: '100%', maxWidth: '100%' },
    '.shadow-overflow': {
      position: 'relative',
      paddingTop: 15,
      '&::after, & ::before': {
        width: '100%',
        bottom: 'auto',
        top: '0',
        left: '0',
        height: '1rem',
        position: 'absolute',
        zIndex: 4,
        content: "''",
        background: `linear-gradient(to bottom, rgba(255, 255, 255, 1) 5%, rgba(255, 255, 255, 0) 100%)`
      },
      '&::after': {
        bottom: '0',
        top: 'auto',
        background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 95%)`
      }
    },
    '.shadow-overflow-horizontal': {
      position: 'relative',
      '&::after, & ::before': {
        width: '1rem',
        top: '0',
        bottom: '0',
        left: '0',
        height: '100%',
        position: 'absolute',
        zIndex: 4,
        content: "''",
        background: `linear-gradient(to right, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 100%)`,
        filter: `progid:DXImageTransform.Microsoft.gradient(startColorstr='${theme.colors.white}', endColorstr='${theme.colors.white}', GradientType=0)`
      },
      '&::after': {
        right: '0',
        left: 'auto',
        background: `linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 80%)`,
        filter: `progid:DXImageTransform.Microsoft.gradient(startColorstr='${theme.colors.white}', endColorstr='${theme.colors.white}', GradientType=0)`
      }
    }
  };
};

export default scrollAreaStyles;
