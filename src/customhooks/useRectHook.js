import React from 'react';
import { Block } from 'cloudhub-components';

import { useRect } from '@reach/rect';
import each from 'lodash/each';

const useRectHook = ({ ref, subscription }) => {
  const rect = useRect(ref) || {};

  const newrect = {};

  each(subscription, (key) => {
    newrect[key] = rect ? rect[key] : undefined;
  });

  return newrect;
};

export default useRectHook;
