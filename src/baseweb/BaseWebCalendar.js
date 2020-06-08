import * as React from 'react';
import { StatefulCalendar } from 'baseui/datepicker';

const BaseWebCalendar = () => (
  <StatefulCalendar
    // use the 'onChange' prop to pull data from the component into your application state
    onChange={({ date }) => console.log(date.getTime())}
  />
);

export default BaseWebCalendar;
