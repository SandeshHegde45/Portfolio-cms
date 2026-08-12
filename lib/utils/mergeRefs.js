export function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        ref.current = node;
      }
    });
  };
}
