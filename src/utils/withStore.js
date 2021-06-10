import React from "react";

export const withStore =
  (stores = []) =>
  (WrappedComponent) =>
  (props) =>
    stores.reduce(
      (component, Store) => <Store.Provider>{component}</Store.Provider>,
      <WrappedComponent {...props} />
    );
