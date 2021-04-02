import React from 'react';
import { LayersContext } from 'baseui/layer';
import { styled } from 'baseui/styles';
import { getOverrides } from 'baseui/helpers/overrides';

const StyledAppContainer = styled('div', {});
const StyledLayersContainer = styled('div', {});

const LayersManager = ({ children, zIndex, ...props }) => {
  const { overrides = {} } = props;
  const host = React.useRef();
  const containerRef = React.useRef();
  const values = React.useContext(LayersContext);

  const [AppContainer, appContainerProps] = getOverrides(
    overrides.AppContainer,
    StyledAppContainer
  );
  const [LayersContainer, layersContainerProps] = getOverrides(
    overrides.LayersContainer,
    StyledLayersContainer
  );
  return (
    <LayersContext.Provider
      value={{
        ...values,
        zIndex,
      }}
    >
      <AppContainer {...appContainerProps} ref={containerRef}>
        {children}
      </AppContainer>
      <LayersContainer {...layersContainerProps} ref={host} />
    </LayersContext.Provider>
  );
};

export default LayersManager;
