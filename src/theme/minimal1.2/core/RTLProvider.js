function RTLProvider({ direction, children }) {
  const isRTL = direction === 'rtl';
  const jss = create({
    plugins: [...jssPreset().plugins, rtl()]
  });

  const cache = createCache({
    key: isRTL ? 'rtl' : 'css',
    prepend: true,
    stylisPlugins: isRTL ? [rtlPlugin] : []
  });

  cache.compat = true;

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  return (
    <CacheProvider value={cache}>
      <StylesProvider jss={jss}>{children}</StylesProvider>
    </CacheProvider>
  );
}

RTLProvider.propTypes = {
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  children: PropTypes.node
};
