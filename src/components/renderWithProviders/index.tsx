import React from "react";
import { render } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { cloneDeep } from "lodash";

import Intl from "src/containers/Intl";
import Theme from "src/containers/Theme";
import { reducer } from "src/store";

type State = Record<string, any>;
type Children = React.ReactNode;
interface IProvidersProps {
  state: State;
  children: Children;
}

export default function renderWithProviders(children: Children, state: State) {
  const store = createStore(reducer, cloneDeep(state), applyMiddleware(thunk));
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
  const store = createStore(reducer, cloneDeep(state), applyMiddleware(thunk));
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
