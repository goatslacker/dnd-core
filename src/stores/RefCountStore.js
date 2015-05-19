export const state = { refCount: 0 }

export const observe = (context) => {
  return {
    addRef: [context.RegistryActions.addSource, context.RegistryActions.addTarget],
    removeRef: [context.RegistryActions.removeSource, context.RegistryActions.removeTarget]
  }
}

export const reduce = (context, prevState, signals) => {
  if (signals.addRef) {
    return { refCount: prevState.refCount + 1 }
  } else if (signals.removeRef) {
    return { refCount: prevState.refCount - 1 }
  } else {
    return prevState
  }
}

export const statics = (context) => {
  return {
    hasRefs() {
      return context.RefCountStore.get().refCount > 0;
    }
  }
}
