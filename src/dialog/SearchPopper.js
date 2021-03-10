import React from 'react';

import { Search, PinDrop } from '@material-ui/icons';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';

import Axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { Block, IconButton } from '..';
import { useDebounce } from '../customhooks';
import TextInput from '../TextInput';
import FieldPopper from './FieldPopper';

const SearchButton = () => (
  <IconButton aria-label="Search">
    <Search />
  </IconButton>
);

const SearchForm = ({
  value,
  onChange,
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
    onChange(debouncedText);
  }, [debouncedText]);

  const renderResults = () =>
    data.map((item, index) => {
      if (typeof RenderItem === 'function') {
        return RenderItem({
          item,
          index,
        });
      }

      return <RenderItem key={keyExtractor(item)} item={item} index={index} />;
    });

  return (
    <Block>
      <TextInput
        ref={inputRef}
        elevation={0}
        showRemove
        onRemoveText={() => {
          onChange('');
        }}
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
  onChange: () => null,
};

const SearchPopper = ({
  placeholder,
  inputProps,
  value,
  input,
  onChange,
  onChangeText,
  renderItem,
  closeOnSelect,
  popperStyle,
  url,
  options,
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

  React.useEffect(() => {
    if (Array.isArray(options) && options.length > 0) {
      setData(options);
    }
  }, [options]);

  const debouncedText = useDebounce(text, 500);
  React.useEffect(() => {
    onChangeText(debouncedText);
  }, [debouncedText]);

  const logChange = (item) => {
    const v = props.valueExtractor(item);
    input.onChange(v);
    onChange(v);
  };

  const selectItem = ({ item, closePopper }) => {
    setText(isObject(item) ? props.labelExtractor(item) : item);
    logChange(item);
    if (closeOnSelect) {
      closePopper();
    }
  };

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
      onClose={() => logChange(text)}
    >
      {({ closePopper }) => (
        <SearchForm
          value={text}
          onChange={(value) => {
            setText(isObject(value) ? props.labelExtractor(value) : value);
          }}
          url={url}
          data={data}
          onDataChanged={(data) => setData(data)}
          renderItem={({ item, index }) =>
            renderItem({
              item,
              index,
              onSelect: () => selectItem({ item, closePopper }),
            })
          }
          inputProps={{
            ...inputProps,
          }}
          popperStyle={popperStyle}
          {...props}
        />
      )}
    </FieldPopper>
  );
};

SearchPopper.defaultProps = {
  input: {
    value: '',
    onChange: () => null,
  },
  onChange: () => null,
  labelExtractor: (item) => `${item}`,
  valueExtractor: (item) => item,
  renderItem: (item) => `${item}`,
  onChangeText: () => {},
  inputProps: {
    placeholder: 'Search...',
  },
  url: '',
  popperStyle: {},
  closeOnSelect: true,
};

export default SearchPopper;
