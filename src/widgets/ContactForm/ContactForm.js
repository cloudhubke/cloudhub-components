import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, TextField } from '@material-ui/core';
import validate from 'validate.js';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const schema = {
  Fullname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
    },
  },
  Phone: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20,
      minimum: 10,
    },
    format: {
      // prettier-ignore
      // eslint-disable-next-line no-useless-escape
      pattern: '^[+\s0-9]+$',
      flags: 'i',
      message: 'can only contain valid phone number',
    },
  },
  Email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 300,
    },
  },
  Message: {
    presence: { allowEmpty: false, message: 'is required' },
  },
};

const INITIAL_STATE = {
  isValid: false,
  values: {},
  touched: {},
  errors: {},
};

const ContactForm = props => {
  const classes = useStyles();

  const [formState, setFormState] = React.useState(INITIAL_STATE);

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const onSubmit = () => {
    if (typeof props.onSubmit == 'function') {
      props.onSubmit({ ...formState.values });
      setFormState(INITIAL_STATE);
    }
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input type="hidden" name="form-name" value="contact-form" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              <strong>Contact Us</strong>
            </Typography>
            <Typography variant="h6" color="textSecondary" align="center">
              We carefully read and answer to all our emails.
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <TextField
              placeholder="Full Name"
              label="Full Name *"
              variant="outlined"
              size="medium"
              name="Fullname"
              fullWidth
              helperText={
                hasError('Fullname') ? formState.errors.Fullname[0] : null
              }
              error={hasError('Fullname')}
              onChange={handleChange}
              type="text"
              value={formState.values.Fullname || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              placeholder="Phone number"
              label="Phone Number *"
              variant="outlined"
              size="medium"
              name="Phone"
              fullWidth
              helperText={hasError('Phone') ? formState.errors.Phone[0] : null}
              error={hasError('Phone')}
              onChange={handleChange}
              type="text"
              value={formState.values.Phone || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              placeholder="E-mail"
              label="E-mail *"
              variant="outlined"
              size="medium"
              name="Email"
              fullWidth
              helperText={hasError('Email') ? formState.errors.Email[0] : null}
              error={hasError('Email')}
              onChange={handleChange}
              type="email"
              value={formState.values.Email || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Message"
              label="Message *"
              variant="outlined"
              name="Message"
              fullWidth
              helperText={
                hasError('Message') ? formState.errors.Message[0] : null
              }
              error={hasError('Message')}
              onChange={handleChange}
              multiline
              rows={4}
              value={formState.values.Message || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Fields that are marked with * sign are required.
            </Typography>
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              disabled={!formState.isValid}
              onClick={onSubmit}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ContactForm;
