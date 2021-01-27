import React from "react";
import { render, screen } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { merge, cloneDeep } from "lodash";

import Intl from "../../containers/Intl";
import Theme from "../../containers/Theme";
import { reducer } from "../../store";
import initialState from "../../store/initialState";

export default function renderWithProviders(component: any, mockState: any) {
  const state = merge(cloneDeep(initialState), mockState);
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
