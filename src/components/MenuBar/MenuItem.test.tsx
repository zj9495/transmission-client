import React from "react";
import { render, fireEvent } from "@testing-library/react";

import MenuItem from "./MenuItem";

const mockProps = {
  text: "MOCK_TEXT",
  icon: "MOCK_ICON",
  num: 1,
  menuOpen: true,
  selected: true,
  onClick: jest.fn(),
};

describe("renders MenuItem", () => {
  test("MenuItem should be rendered correctly", () => {
    const { container, getByText, rerender } = render(
      <MenuItem {...mockProps} />
    );
    expect(
      container.querySelector(".MuiListItemText-root > span")?.textContent
    ).toBe(mockProps.text);
    expect(
      container.querySelector(".MuiListItemIcon-root .MuiBadge-root")
        ?.textContent
    ).toBe(`${mockProps.icon}0`);
    expect(
      container.querySelector(".MuiListItemIcon-root .MuiBadge-badge")
        ?.textContent
    ).toBe("0");
    expect(
      container.querySelector(
        ".MuiListItemSecondaryAction-root .MuiBadge-badge"
      )?.textContent
    ).toBe(`${mockProps.num}`);

    expect(mockProps.onClick.mock.calls.length).toBe(0);
    fireEvent.click(getByText(mockProps.text));
    expect(mockProps.onClick.mock.calls.length).toBe(1);

    rerender(<MenuItem {...mockProps} menuOpen={false} />);

    expect(
      container.querySelector(".MuiListItemIcon-root .MuiBadge-root")
        ?.textContent
    ).toBe(`${mockProps.icon}${mockProps.num}`);
    expect(
      container.querySelector(".MuiListItemIcon-root .MuiBadge-badge")
        ?.textContent
    ).toBe(`${mockProps.num}`);
    expect(
      container.querySelector(
        ".MuiListItemSecondaryAction-root .MuiBadge-badge"
      )?.textContent
    ).toBe("0");
  });
});
