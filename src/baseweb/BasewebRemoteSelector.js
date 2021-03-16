import React from 'react';
import axios from 'axios';
import BasewebSelect from './BasewebSelect';

const BasewebRemoteSelect = (props) => {
  const {
    input,
    value,
    onChange,
    meta,
    multi,
    returnkeys,
    axiosinstance,
    search,
    select,
    url,
    ...rest
  } = props;
  const cachedResults = React.useRef({});
  const [isLoading, setisLoading] = React.useState(false);
  const [filter, setfilter] = React.useState('');
  const [options, setoptions] = React.useState([]);

  const getOptions = React.useCallback(async () => {
    try {
      const filterkey = `${url}${filter || ''}`;
      if (url) {
        if (cachedResults.current[filterkey]) {
          setoptions(cachedResults.current[filterkey]);
          return;
        }
        setisLoading(true);
        const { data } = await axiosinstance().get(url, { params: { filter } });
        if (data && Array.isArray(data.items)) {
          setoptions(data.items);
          cachedResults.current[filterkey] = data.items;
        }
        if (Array.isArray(data)) {
          setoptions(data);
          cachedResults.current[filterkey] = data;
        }
        setisLoading(false);
      }
    } catch (error) {}
  }, [url, filter]);

  React.useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <BasewebSelect
      options={options}
      onInputChange={(event) => {
        const { target } = event;
        setfilter(target.value);
      }}
      isLoading={isLoading}
      {...rest}
    />
  );
};

BasewebRemoteSelect.defaultProps = {
  axiosinstance: () => axios.create({}),
};

export default BasewebRemoteSelect;
