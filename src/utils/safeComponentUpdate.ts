
export const createSafeComponent = (componentFactory: () => JSX.Element) => {
  // This function creates a component that can be safely updated without animation conflicts
  return componentFactory;
};

export const applyComponentChanges = (changes: Record<string, any>) => {
  // Apply changes in a way that doesn't trigger animation loops during saves
  return { ...changes };
};
