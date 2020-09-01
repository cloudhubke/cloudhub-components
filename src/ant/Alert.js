import React from 'react';
import AntAlert from 'antd/lib/alert';

import 'antd/lib/alert/style/index.css';

const Alert = ({
  danger,
  info,
  success,
  error,
  warning,
  message,
  description,
  closable,
  onClose,
  showIcon,
}) => {
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

  return (
    <AntAlert
      message={message}
      description={description}
      type={type}
      closable={closable}
      onClose={onClose}
      showIcon={showIcon}
    />
  );
};

Alert.defaultProps = {
  closable: true,
  onClose: () => {},
  showIcon: true,
};

export default Alert;
