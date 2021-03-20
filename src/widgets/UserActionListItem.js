import React from 'react';
import moment from 'moment';

const UserActionListItem = ({
  title = '',
  username = '',
  avatar,
  timestamp,
  rightComponent,
  imgUrl,
  ...props
}) => {
  const [] = React.useState(0);

  return (
    <div className="d-flex justify-content-between">
      <div>
        <div className="font-weight-bold">
          <a
            href="#/"
            onClick={(e) => e.preventDefault()}
            className="text-black"
          >
            {title}
          </a>
        </div>
        <small className="d-flex pt-2 align-items-center">
          {avatar}
          <a href="" onClick={(e) => e.preventDefault()}>
            {username}
          </a>
          {timestamp && (
            <span className="pl-2 text-muted">
              {moment(timestamp).fromNow()}
            </span>
          )}
        </small>
      </div>
      {rightComponent}
    </div>
  );
};

export default UserActionListItem;
