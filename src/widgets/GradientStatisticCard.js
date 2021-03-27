import React from 'react';
import { Card } from '@material-ui/core';
import CountUp from 'react-countup';

const GradientStatisticCard = ({
  title = 'Stat',
  prefix = '',
  suffix = '',
  right = '',
  color = 'deep-sky',
  textColor = 'white',
  figure = 0,
  countUp = false
}) => {
  const [] = React.useState(0);

  return (
    <Card className={`p-3 bg-${color}`}>
      <div className={`text-${textColor}-50 pb-2`}>{title}</div>
      <div className="d-flex justify-content-between align-items-end">
        <h3 className="display-4 mb-0">
          <small className={`pr-1 text-${textColor}-50`}>{prefix}</small>
          {!countUp && <span className={`text-${textColor}`}>{figure}</span>}
          {countUp && (
            <CountUp
              start={0}
              end={figure}
              duration={6}
              delay={2}
              separator=""
              decimals={2}
              decimal="."
            />
          )}
          <small className={`pr-1 text-${textColor}-50`}>{suffix}</small>
        </h3>
        <div className={`text-${textColor} font-weight-bold`}>{right}</div>
      </div>
    </Card>
  );
};

export default GradientStatisticCard;
