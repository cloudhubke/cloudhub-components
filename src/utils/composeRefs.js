export default function composeRefs(...refs) {
  if (refs.length === 2) {
    // micro-optimize the hot path
    return composeTwoRefs(refs[0], refs[1]);
  }
  return refs
    .slice(1)
    .reduce(
      (semiCombinedRef, refToInclude) =>
        composeTwoRefs(semiCombinedRef, refToInclude),
      refs[0]
    );
}
const composedRefCache = new WeakMap();
function composeTwoRefs(ref1, ref2) {
  if (ref1 && ref2) {
    const ref1Cache = composedRefCache.get(ref1) || new WeakMap();
    composedRefCache.set(ref1, ref1Cache);
    const composedRef = ref1Cache.get(ref2)
      || (instance => {
        updateRef(ref1, instance);
        updateRef(ref2, instance);
      });
    ref1Cache.set(ref2, composedRef);
    return composedRef;
  }
  if (!ref1) {
    return ref2;
  }
  return ref1;
}
function updateRef(ref, instance) {
  if (typeof ref === 'function') {
    ref(instance);
  } else {
    ref.current = instance;
  }
}
