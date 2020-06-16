import React from 'react';

import { Search, PinDrop } from '@material-ui/icons';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';

import Axios from 'axios';
import { Divider, Block, IconButton } from '..';
import { useDebounce } from '../customhooks';
import { CircularProgress } from '../mui/core';
import TextInput from '../TextInput';
import FieldPopper from './FieldPopper';

const SearchButton = () => (
  <IconButton aria-label="Search">
    <Search />
  </IconButton>
);

const SearchForm = ({
  input: { onChange, value },

  url,
  axiosinstance,
  paramName,
  otherparams,
  renderItem: RenderItem,
  labelExtractor,
  data,
  keyExtractor,
  onDataChanged,
  inputProps,
  popperStyle,
}) => {
  const inputRef = React.useRef();
  const [text, setText] = React.useState(
    isObject(value) ? labelExtractor(value || '') : value
  );
  const [selectedValue, setSelectedValue] = React.useState(value);
  const [fetching, setFetching] = React.useState(false);
  const [fetch, setFetch] = React.useState(isEmpty(data));

  const debouncedText = useDebounce(text, 400);

  const fetchData = async () => {
    try {
      setFetching(true);
      // await sleep(2000);
      const { data } = await axiosinstance().get(`${url}`, {
        params: {
          [paramName]: debouncedText,
          ...otherparams,
        },
      });

      const arr = data.items || data;

      if (arr && Array.isArray(arr)) {
        onDataChanged(arr);
        setFetching(false);
        setFetch(false);
      }
    } catch (error) {
      setFetching(false);
      setFetch(false);
    }
  };

  const onSelect = (item) => {
    setSelectedValue(item);
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(`${text}`.length, `${text}`.length);
    }
  }, [inputRef.current]);

  React.useEffect(() => {
    setText(isObject(value) ? labelExtractor(value || '') : value);
  }, [value]);

  React.useEffect(() => {
    if (url && fetch) {
      fetchData(url);
    }
  }, [url, debouncedText]);

  React.useEffect(() => {
    input.onChange(debouncedText);
  }, [debouncedText]);

  React.useEffect(() => {
    onChange(selectedValue);
    setText(
      isObject(selectedValue) ? labelExtractor(selectedValue) : selectedValue
    );
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(`${text}`.length, `${text}`.length);
    }
  }, [selectedValue]);

  const renderResults = () =>
    data.map((item, index) => {
      if (typeof RenderItem === 'function') {
        return RenderItem({ item, index, onSelect });
      }

      return (
        <RenderItem
          key={keyExtractor(item)}
          item={item}
          index={index}
          onSelect
        />
      );
    });

  return (
    <Block>
      <TextInput
        ref={inputRef}
        elevation={0}
        showRemove
        onRemoveText={() => setText('')}
        rightComponent={<SearchButton />}
        style={{ borderWidth: 0 }}
        value={text}
        onChange={(e) => {
          setFetch(true);
          setText(e.target.value);
        }}
        {...inputProps}
      />

      <Block style={{ overflow: 'auto', ...popperStyle }}>
        {fetching && (
          <Block center middle>
            <CircularProgress />
          </Block>
        )}
        {renderResults()}
      </Block>
    </Block>
  );
};

SearchForm.defaultProps = {
  options: [],
  axiosinstance: () => Axios.create({}),
  labelExtractor: (item) => item,
  valueExtractor: (item) => item,
  keyExtractor: (item) => (isObject(item) ? item.id || item : item),
  paramName: 'filter',
  otherparams: {},
};

const SearchPopper = ({
  placeholder,
  inputProps,
  value,
  input,
  renderItem,
  popperStyle,
  url,
  ...props
}) => {
  const val = value || input.value;
  const popperInputRef = React.useRef();
  const [text, setText] = React.useState(
    isObject(val) ? props.labelExtractor(val) : val
  );
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setText(isObject(val) ? props.labelExtractor(val) : val);
  }, [input.value]);

  const SearchInputComponent = (props) => (
    <TextInput
      value={text}
      showRemove
      onRemoveText={() => setText('')}
      rightComponent={<SearchButton />}
      leftComponent={
        <Block flex={false}>
          <PinDrop />
        </Block>
      }
      paper
      onChange={(e) => setText(e.target.value)}
      {...props}
      {...inputProps}
    />
  );

  return (
    <FieldPopper
      searchInputComponent={SearchInputComponent}
      onOpen={() => {
        setTimeout(() => {
          if (popperInputRef.current) {
            popperInputRef.current.focus();
          }
        });
      }}
    >
      <SearchForm
        value={input.value}
        onChange={(item) => {
          input.onChange(item);
        }}
        url={url}
        data={data}
        onDataChanged={(data) => setData(data)}
        renderItem={renderItem}
        inputProps={{
          ...inputProps,
        }}
        popperStyle={popperStyle}
        {...props}
      />
    </FieldPopper>
  );
};

SearchPopper.defaultProps = {
  input: {
    value: '',
    onChange: () => null,
  },
  labelExtractor: (item) => `${item}`,
  valueExtractor: ({ item }) => item,
  renderItem: (item) => `${item}`,

  inputProps: {
    placeholder: 'Search...',
  },
  url: '',
  popperStyle: {},
};

export default SearchPopper;
