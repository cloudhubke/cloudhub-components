import React from 'react';
import Loadable from '@react-loadable/revised';
import Box from '@material-ui/core/Box';
import mui from '@material-ui/core/package.json';
import Loading from './Loading';

const Rating = mui.version.includes('4.')
  ? Loadable({
      loader: () =>
        import(/* webpackChunkName: "BaseTheme" */ '@material-ui/lab/Rating'),
      loading: () => (
        <Box justifyContent="center" alignItems="center">
          <Loading />
        </Box>
      ),
    })
  : Loadable({
      loader: () =>
        import(/* webpackChunkName: "BaseTheme" */ '@material-ui/core/Rating'),
      loading: () => (
        <Box justifyContent="center" alignItems="center">
          <Loading />
        </Box>
      ),
    });

const MuiRating = ({ input, value, onChange, ...props }) =>
  input && input.name ? (
    <Rating
      name={input.name}
      {...props}
      onChange={input.onChange}
      value={Number(input.value)}
    />
  ) : (
    <Rating {...props} value={Number(value)} onChange={onChange} />
  );
MuiRating.defaultProps = {
  input: {
    value: 0,
    onChange: () => {},
  },
};
export default MuiRating;
