import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { merge, cloneDeep } from "lodash";

import Intl from "src/containers/Intl";
import Theme from "src/containers/Theme";
import { reducer } from "src/store";
import initialState from "src/store/initialState";

const initialMockState = {
  rpc: {
    locale: "en-US",
  },
};

export default function renderWithProviders(component: any, mockState: any) {
  const state = merge(cloneDeep(initialState), initialMockState, mockState);
  const store = createStore(reducer, state);
  const id = "render-with-providers-container";
  return render(
    <Provider store={store}>
      <Intl>
        <Theme>
          <div id={id}>{component}</div>
        </Theme>
      </Intl>
    </Provider>
  );
}

interface IProvidersProps {
  state: Record<string, any>;
  children: React.ReactNode;
}

export function Providers(props: IProvidersProps) {
  const { children, state: mockState = {} } = props;
  const state = merge(cloneDeep(initialState), initialMockState, mockState);
  const store = createStore(reducer, state);
  const id = "providers";
  return (
    <Provider store={store}>
      <Intl>
        <Theme>
          <div id={id}>{children}</div>
        </Theme>
      </Intl>
    </Provider>
  );
}
