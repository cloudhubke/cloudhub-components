import { createTheme } from 'baseui';
import cloudhubPrimitives from './primitives';
import cloudhubOverrides from './overrides';

const theme = ({ primitives, overrides }) =>
  createTheme(
    { ...cloudhubPrimitives, ...primitives },
    { ...cloudhubOverrides, ...overrides }
  );

export default theme;
