import React, { useState, useEffect } from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import hexToRgb from './theme/hexToRgb';

const useStyles = makeStyles(({ colors }) => ({
  pagination: {
    display: 'flex',
    paddingLeft: '0',
    listStyle: 'none',
    borderRadius: '0.25rem',
  },
  paginationItem: {
    display: 'inline',
  },
  paginationLink: {
    ':first-of-type': {
      marginleft: '0',
    },
    border: '0',
    borderRadius: '30px !important',
    transition: 'all .3s',
    padding: '0px 11px',
    margin: '0 3px',
    minWidth: '30px',
    height: '30px',
    minHeight: 'auto',
    lineHeight: '30px',
    fontWeight: '400',
    fontSize: '12px',
    textTransform: 'none',
    background: 'transparent',
    position: 'relative',
    float: 'left',
    textDecoration: 'none',
    boxSizing: 'border-box',
    '&,&:hover,&:focus': {
      color: colors.grayColor[0],
    },
    '&:hover,&:focus': {
      zIndex: '3',
      backgroundColor: colors.grayColor[2],
      borderColor: colors.grayColor[6],
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  primary: {
    '&,&:hover,&:focus': {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      color: colors.whiteColor,
      boxShadow: `0 4px 5px 0 rgba(${hexToRgb(
        colors.primary
      )}, 0.14), 0 1px 10px 0 rgba(${hexToRgb(
        colors.primary
      )}, 0.12), 0 2px 4px -1px rgba(${hexToRgb(colors.primary)}, 0.2)`,
    },
    '&:hover,&:focus': {
      zIndex: '2',
      cursor: 'default',
    },
  },
  info: {
    '&,&:hover,&:focus': {
      backgroundColor: colors.infoColor[0],
      borderColor: colors.infoColor[0],
      color: colors.whiteColor,
      boxShadow: `0 4px 5px 0 rgba(${hexToRgb(
        colors.infoColor[0]
      )}, 0.14), 0 1px 10px 0 rgba(${hexToRgb(
        colors.infoColor[0]
      )}, 0.12), 0 2px 4px -1px rgba(${hexToRgb(colors.infoColor[0])}, 0.2)`,
    },
    '&:hover,&:focus': {
      zIndex: '2',
      cursor: 'default',
    },
  },
  success: {
    '&,&:hover,&:focus': {
      backgroundColor: colors.successColor[0],
      borderColor: colors.successColor[0],
      color: colors.whiteColor,
      boxShadow: `0 4px 5px 0 rgba(${hexToRgb(
        colors.successColor[0]
      )}, 0.14), 0 1px 10px 0 rgba(${hexToRgb(
        colors.successColor[0]
      )}, 0.12), 0 2px 4px -1px rgba(${hexToRgb(colors.successColor[0])}, 0.2)`,
    },
    '&:hover,&:focus': {
      zIndex: '2',
      cursor: 'default',
    },
  },
  warning: {
    '&,&:hover,&:focus': {
      backgroundColor: colors.warningColor[0],
      borderColor: colors.warningColor[0],
      color: colors.whiteColor,
      boxShadow: `0 4px 5px 0 rgba(${hexToRgb(
        colors.warningColor[0]
      )}, 0.14), 0 1px 10px 0 rgba(${hexToRgb(
        colors.warningColor[0]
      )}, 0.12), 0 2px 4px -1px rgba(${hexToRgb(colors.warningColor[0])}, 0.2)`,
    },
    '&:hover,&:focus': {
      zIndex: '2',
      cursor: 'default',
    },
  },
  danger: {
    '&,&:hover,&:focus': {
      backgroundColor: colors.dangerColor[0],
      borderColor: colors.dangerColor[0],
      color: colors.whiteColor,
      boxShadow: `0 4px 5px 0 rgba(${hexToRgb(
        colors.dangerColor[0]
      )}, 0.14), 0 1px 10px 0 rgba(${hexToRgb(
        colors.dangerColor[0]
      )}, 0.12), 0 2px 4px -1px rgba(${hexToRgb(colors.dangerColor[0])}, 0.2)`,
    },
    '&:hover,&:focus': {
      zIndex: '2',
      cursor: 'default',
    },
  },
  disabled: {
    '&,&:hover,&:focus': {
      color: colors.grayColor[10],
      cursor: 'not-allowed',
      backgroundColor: colors.whiteColor,
      borderColor: colors.grayColor[6],
    },
  },
}));

function Pagination({ ...props }) {
  const { count, rowsPerPage, color, className } = props;
  const classes = useStyles();
  const paginationClasses = classNames(classes.pagination, className);

  const [currentPage, setPage] = useState(0);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const totalpages = Math.ceil(count / rowsPerPage) - 1;
  const firstPage = 0;
  const lastPage = Math.max(0, totalpages);

  const pages = [
    totalpages > 1 && currentPage === lastPage ? currentPage - 2 : null,
    currentPage > 0 ? currentPage - 1 : null,
    currentPage,
    totalpages > currentPage ? currentPage + 1 : null,
    totalpages > 1 && currentPage === 0 ? currentPage + 2 : null,
  ];

  const handleButtoClick = (page) => {
    if (Number(page) || page === 0) {
      setPage(page);
      props.onChangePage(page);
    }
    if (page === 'last') {
      setPage(lastPage);
      props.onChangePage(lastPage);
    }
    if (page === 'first') {
      setPage(firstPage);
      props.onChangePage(firstPage);
    }
  };

  const firstpaginationLink = classNames({
    [classes.paginationLink]: true,
    [classes.disabled]: currentPage === 0,
  });

  const lastpaginationLink = classNames({
    [classes.paginationLink]: true,
    [classes.disabled]: currentPage === lastPage,
  });

  return (
    <ul className={paginationClasses}>
      <li>
        <Button
          onClick={() => handleButtoClick('first')}
          className={firstpaginationLink}
          disabled={currentPage === 0}
        >
          First
        </Button>
      </li>
      <li>
        <Button
          onClick={() =>
            handleButtoClick(currentPage > 0 ? currentPage - 1 : 0)
          }
          className={firstpaginationLink}
          disabled={currentPage === 0}
        >
          <ChevronLeft />
        </Button>
      </li>
      {pages
        .filter((p) => p !== null)
        .map((page, index) => {
          const paginationLink = classNames({
            [classes.paginationLink]: true,
            [classes[color]]: page === currentPage,
            [classes.disabled]: false,
          });
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li className={classes.paginationItem} key={`i${index}`}>
              <Button
                onClick={() => handleButtoClick(page)}
                className={paginationLink}
                disabled={false}
              >
                {page + 1}
              </Button>
            </li>
          );
        })}
      <li>
        <Button
          onClick={() => handleButtoClick(currentPage + 1)}
          className={lastpaginationLink}
          disabled={currentPage === lastPage}
        >
          <ChevronRight />
        </Button>
      </li>
      <li>
        <Button
          onClick={() => handleButtoClick('last')}
          className={lastpaginationLink}
          disabled={currentPage === lastPage}
        >
          Last
        </Button>
      </li>
    </ul>
  );
}

Pagination.defaultProps = {
  color: 'primary',
  onChangePage: () => {},
};

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  onChangePage: PropTypes.func,
};

export default Pagination;
