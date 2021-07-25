import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function useBreakpoints(direction, firstkey, lastkey) {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();

  const upMatches = useMediaQuery(theme.breakpoints.up(firstkey));
  const dowMatches = useMediaQuery(theme.breakpoints.down(firstkey));
  const betweenMatches = useMediaQuery(
    theme.breakpoints.between(firstkey, lastkey)
  );

  if (direction === 'up') return upMatches;
  if (direction === 'down') return dowMatches;
  if (direction === 'between') return betweenMatches;
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

// Usage
// const upMd = useBreakpoints('up','md') // > 960px
// const downMd = useBreakpoints('down','md') // < 960px
// const betweenSmMd = useBreakpoints('between','md', 'lg') // 960px ~ 1280px
