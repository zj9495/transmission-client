import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

import { Providers } from "src/components/renderWithProviders";

import LanguageToggle from "./index";

describe("test LanguageToggle", () => {
  it("should update language from store", () => {
    const state = {
      app: {
        locale: "en",
      },
    };
    const { rerender } = render(
      <Providers state={state}>
        <LanguageToggle />
      </Providers>
    );

    expect(screen.queryByTestId("selected-language")?.textContent).toBe(
      "English"
    );

    state.app.locale = "zh-CN";
    rerender(
      <Providers state={state}>
        <LanguageToggle />
      </Providers>
    );

    expect(screen.queryByTestId("selected-language")?.textContent).toBe(
      "中文 - 简体"
    );
  });

  it("should update language from Menu", () => {
    const state = {
      app: {
        locale: "en",
      },
    };
    render(
      <Providers state={state}>
        <LanguageToggle />
      </Providers>
    );

    expect(screen.queryByTestId("selected-language")?.textContent).toBe(
      "English"
    );
    expect(screen.queryByTestId("language-menu")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("English"));
    expect(screen.queryByTestId("language-menu")).toBeInTheDocument();

    fireEvent.click(screen.getByText("中文 - 简体"));
    waitFor(() => {
      expect(screen.queryByTestId("language-menu")).not.toBeInTheDocument();
    });
    expect(screen.queryByTestId("selected-language")?.textContent).toBe(
      "中文 - 简体"
    );
  });
});
