import { createTheme } from 'baseui';
import cloudhubPrimitives from './primitives';
import cloudhubOverrides from './overrides';

const theme = ({ primitives, overrides, ...rest }) =>
  createTheme(
    { ...cloudhubPrimitives({ ...rest }), ...primitives },
    { ...cloudhubOverrides({ ...rest }), ...overrides }
  );

export default theme;
