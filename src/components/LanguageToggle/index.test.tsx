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
    screen.getByLabelText("English");

    state.app.locale = "zh-CN";
    rerender(
      <Providers state={state}>
        <LanguageToggle />
      </Providers>
    );

    screen.getByLabelText("中文 - 简体");
  });

  it("should update language from Menu", () => {
    const state = {
      app: {
        locale: "en",
      },
    };
    const { container } = render(
      <Providers state={state}>
        <LanguageToggle />
      </Providers>
    );

    const languageSelectTextField = container.querySelector(
      "#select-language"
    ) as HTMLDivElement;

    screen.getByLabelText("English");
    expect(screen.queryByTestId("language-menu")).not.toBeInTheDocument();

    fireEvent.mouseDown(languageSelectTextField);
    expect(screen.getByTestId("language-menu")).toBeInTheDocument();

    fireEvent.click(screen.getByText("中文 - 简体"));
    waitFor(() => {
      expect(screen.getByTestId("language-menu")).not.toBeInTheDocument();
    });

    screen.getByLabelText("中文 - 简体");
  });
});
