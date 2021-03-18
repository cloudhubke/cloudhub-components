import React from 'react';
import axios from 'axios';
import BaseWebSelect from './BaseWebSelect';
import { useDebounce } from '../customhooks';

const BasewebRemoteSelect = (props) => {
  const { axiosinstance, url, ...rest } = props;
  const cachedResults = React.useRef({});
  const [isLoading, setisLoading] = React.useState(false);
  const [filter, setfilter] = React.useState('');
  const [options, setoptions] = React.useState([]);

  const debouncedFilter = useDebounce(filter, 1000);

  const getOptions = React.useCallback(async () => {
    try {
      const filterkey = `${url}${debouncedFilter || ''}`;
      if (url) {
        if (cachedResults.current[filterkey]) {
          setoptions(cachedResults.current[filterkey]);
          return;
        }
        setisLoading(true);
        const { data } = await axiosinstance().get(url, {
          params: { filter: debouncedFilter },
        });
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
  }, [url, debouncedFilter]);

  React.useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <BaseWebSelect
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
