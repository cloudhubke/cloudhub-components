import React from 'react';
import axios from 'axios';
import BaseWebSelect from './BaseWebSelect';
import { useDebounce } from '../customhooks';

const BasewebRemoteSelect = ({
  axiosinstance,
  url,
  debounceTime,
  params,
  filterkey = 'filter',
  ...rest
}) => {
  const cachedResults = React.useRef({});
  const [isLoading, setisLoading] = React.useState(false);
  const [filter, setfilter] = React.useState('');
  const [options, setoptions] = React.useState([]);

  const debouncedFilter = useDebounce(filter, debounceTime);

  const getOptions = React.useCallback(async () => {
    try {
      const resultkey = `${url}${debouncedFilter || ''}`;
      if (url) {
        setisLoading(true);
        if (cachedResults.current[resultkey]) {
          setoptions(cachedResults.current[resultkey]);
        } else {
          const { data } = await axiosinstance().get(url, {
            params: { ...params, [filterkey]: debouncedFilter },
          });
          if (data && Array.isArray(data.items)) {
            setoptions(data.items);
            cachedResults.current[resultkey] = data.items;
          }
          if (Array.isArray(data)) {
            setoptions(data);
            cachedResults.current[resultkey] = data;
          }
        }
        setTimeout(() => {
          setisLoading(false);
        }, 200);
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
  debounceTime: 1000,
  params: {},
};

export default BasewebRemoteSelect;
