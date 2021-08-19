import React from "react";
import { render } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { cloneDeep, merge } from "lodash";

import Intl from "src/containers/Intl";
import Theme from "src/containers/Theme";
import { reducer } from "src/store";
import initialState from "src/store/initialState";

type State = Record<string, any>;
type Children = React.ReactNode;
interface IProvidersProps {
  state: State;
  children: Children;
}

export const createState = (state: State) =>
  merge(cloneDeep(initialState), state);

export const createMockStore = (state: State) =>
  createStore(reducer, createState(state), applyMiddleware(thunk));

export default function renderWithProviders(children: Children, state: State) {
  const store = createMockStore(state);
  const id = "render-with-providers-container";
  return render(
    <Provider store={store}>
      <Intl>
        <Theme>
          <div id={id}>{children}</div>
        </Theme>
      </Intl>
    </Provider>
  );
}

export function Providers(props: IProvidersProps) {
  const { children, state = {} } = props;
  const store = createMockStore(state);
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
