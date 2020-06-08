/**
 * Welcome to @reach/rect!
 *
 * Measures DOM elements (aka. bounding client rect).
 *
 * @see getBoundingClientRect https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 * @see Docs                  https://reacttraining.com/reach-ui/rect
 * @see Source                https://github.com/reach/reach-ui/tree/master/packages/rect
 */

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import observeRect from '@reach/observe-rect';
import { useIsomorphicLayoutEffect } from '@reach/utils';

// //////////////////////////////////////////////////////////////////////////////

export const Rect = ({ onChange, observe = true, children }) => {
  const ref = useRef(null);
  const rect = useRect(ref, observe, onChange);
  return children({ ref, rect });
};

export const useRect = (nodeRef, observe = true, onChange = () => null) => {
  const initialRectSet = useRef(false);
  const [rect, setRect] = useState(null);
  const observerRef = useRef(null);
  useIsomorphicLayoutEffect(() => {
    const cleanup = () => {
      observerRef.current && observerRef.current.unobserve();
    };

    if (!nodeRef.current) {
      console.warn('You need to place the ref');
      return cleanup;
    }

    if (!observerRef.current) {
      observerRef.current = observeRect(nodeRef.current, (rect) => {
        onChange && onChange(rect);
        setRect(rect);
      });
    }

    if (!initialRectSet.current) {
      initialRectSet.current = true;
      setRect(nodeRef.current.getBoundingClientRect());
    }

    observe && observerRef.current.observe();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observe, onChange]);

  return rect;
};

export default Rect;
