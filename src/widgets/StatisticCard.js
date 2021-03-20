import React from 'react';
import { Card } from '@material-ui/core';
import CountUp from 'react-countup';

const StatisticCard = ({
  title = 'Stat',
  prefix = '',
  suffix = '',
  right = '',
  color = 'success',
  figure = 0
}) => {
  const [] = React.useState(0);

  return (
    <Card className={`shadow-${color}-sm p-3`}>
      <div className="text-black-50 pb-2">{title}</div>
      <div className="d-flex justify-content-between align-items-end">
        <h3 className={`display-4 mb-0 text-${color}`}>
          <small className="pr-1">{prefix}</small>
          <CountUp
            start={0}
            end={figure}
            duration={6}
            delay={2}
            separator=""
            decimals={2}
            decimal="."
          />
          <small className="pr-1">{suffix}</small>
        </h3>
        <div className={`text-${color} font-weight-bold`}>{right}</div>
      </div>
    </Card>
  );
};

export default StatisticCard;
