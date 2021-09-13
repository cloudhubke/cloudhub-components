import * as React from 'react';
import Loadable from '@react-loadable/revised';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import mui from '@mui/material/package.json';
import Loading from './Loading';

const AlertTitle = mui.version.includes('4.')
  ? Loadable({
      loader: () =>
        import(/* webpackChunkName: "BaseTheme" */ '@mui/material/AlertTitle'),
      loading: () => (
        <Box justifyContent="center" alignItems="center">
          <Loading />
        </Box>
      ),
    })
  : Loadable({
      loader: () =>
        import(/* webpackChunkName: "BaseTheme" */ '@mui/material/AlertTitle'),
      loading: () => (
        <Box justifyContent="center" alignItems="center">
          <Loading />
        </Box>
      ),
    });
const MuiAlert = mui.version.includes('4.')
  ? Loadable({
      loader: () =>
        import(/* webpackChunkName: "BaseTheme" */ '@mui/material/Alert'),
      loading: () => (
        <Box justifyContent="center" alignItems="center">
          <Loading />
        </Box>
      ),
    })
  : Loadable({
      loader: () =>
        import(/* webpackChunkName: "BaseTheme" */ '@mui/material/Alert'),
      loading: () => (
        <Box justifyContent="center" alignItems="center">
          <Loading />
        </Box>
      ),
    });

const Alert = ({
  danger,
  info,
  success,
  error,
  warning,
  message,
  description,
  closable,
  noclose,
  children,
  onClose,
  showIcon,
  title,
  open = true,
  ...props
}) => {
  const [alertopen, setAlertOpen] = React.useState(open);
  let type = 'info';

  if (info) {
    type = 'info';
  }
  if (danger || error) {
    type = 'error';
  }
  if (success) {
    type = 'success';
  }
  if (warning) {
    type = 'warning';
  }

  let closeProps = {
    onClose: () => {
      setAlertOpen(false);
      if (typeof onClose === 'function') {
        onClose();
      }
    },
  };

  if (!closable || noclose) {
    closeProps = {};
  }

  return (
    <Box
      sx={{
        width: '100%',
        '& > * + *': {
          mt: 2,
        },
      }}
    >
      <Collapse in={alertopen}>
        <MuiAlert severity={type} {...closeProps} {...props}>
          <AlertTitle>{`${title || type}`}</AlertTitle>
          {message || description || children}
        </MuiAlert>
      </Collapse>
    </Box>
  );
};

Alert.defaultProps = {
  closable: true,
  onClose: null,
  showIcon: true,
};

export default Alert;
