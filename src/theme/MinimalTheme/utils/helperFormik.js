import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from '../components/Scrollbars';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.body1,
    top: 0,
    right: 0,
    bottom: 0,
    width: 320,
    zIndex: 9999999,
    position: 'fixed',
    backdropFilter: 'blur(8px)',
    paddingLeft: theme.spacing(3),
    boxShadow: theme.shadows['25'].z24,
    color: theme.palette.primary.light,
    background: alpha(theme.palette.grey['900'], 0.96),
    '& code': {
      ...theme.typography.body1
    }
  },
  label: {
    ...theme.typography.subtitle1,
    minWidth: 160,
    margin: theme.spacing(1, 0),
    color: theme.palette.primary.lighter
  },

  bool: {
    '& code': {
      color: theme.palette.warning.contrastText,
      backgroundColor: theme.palette.warning.main
    }
  },
  isActive: {
    '& code': {
      color: theme.palette.warning.contrastText,
      backgroundColor: theme.palette.primary.main
    }
  }
}));

// ----------------------------------------------------------------------

HelperFormik.propTypes = {
  formik: PropTypes.object
};

function HelperFormik({ formik }) {
  const classes = useStyles();
  const {
    dirty,
    status,
    values,
    errors,
    touched,
    isValid,
    // submitCount,
    isSubmitting,
    isValidating,
    initialValues,
    validateOnBlur,
    validateOnMount,
    validateOnChange
  } = formik;

  const Bool = (name, action) => {
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center' }}
        className={clsx(classes.bool, { [classes.isActive]: action })}
      >
        <div className={classes.label}>{name}</div>
        <code>:{JSON.stringify(action)}</code>
      </Box>
    );
  };

  return (
    <pre className={classes.root}>
      <Scrollbars style={{ height: '100%' }}>
        <div className={classes.label}>values</div>
        <code>{JSON.stringify(values, null, 2)}</code>

        <div className={classes.label}>initialValues</div>
        <code>{JSON.stringify(initialValues, null, 2)}</code>

        <div className={classes.label}>errors</div>
        <code>{JSON.stringify(errors, null, 2)}</code>

        <div className={classes.label}>status</div>
        <code>{JSON.stringify(status, null, 2)}</code>

        <div className={classes.label}>touched</div>
        <code>{JSON.stringify(touched, null, 2)}</code>

        {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <div className={classes.label}>submitCount</div>
        <code>:{JSON.stringify(submitCount)}</code>
      </Box> */}

        {Bool('isSubmitting', isSubmitting)}
        {Bool('dirty', dirty)}
        {Bool('isValid', isValid)}
        {Bool('isValidating', isValidating)}
        {Bool('validateOnBlur', validateOnBlur)}
        {Bool('validateOnChange', validateOnChange)}
        {Bool('validateOnMount', validateOnMount)}
      </Scrollbars>
    </pre>
  );
}

export default HelperFormik;
