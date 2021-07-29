import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SeedModeCheckbox from "./index";

describe("renders SeedModeCheckbox", () => {
  test.each`
    value | checked  | indeterminate
    ${0}  | ${false} | ${"true"}
    ${1}  | ${true}  | ${"false"}
    ${2}  | ${false} | ${"false"}
  `(
    "checked should be $checked indeterminate should be $indeterminate when value is $value",
    ({ value, checked, indeterminate }) => {
      const { getByTestId } = render(
        <SeedModeCheckbox
          value={value}
          inputProps={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            "data-testid": "seed-mode-checkbox",
          }}
        />
      );
      const checkbox = getByTestId("seed-mode-checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(checked);
      expect(checkbox.dataset.indeterminate).toBe(indeterminate);
    }
  );

  test("test state switching", () => {
    const Demo = () => {
      const [value, setValue] = React.useState(0);

      return (
        <SeedModeCheckbox
          value={value}
          onChange={(newValue) => setValue(newValue as number)}
          inputProps={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            "data-testid": "seed-mode-checkbox",
          }}
        />
      );
    };
    const { getByTestId } = render(<Demo />);
    const checkbox = getByTestId("seed-mode-checkbox") as HTMLInputElement;

    // indeterminate
    expect(checkbox.checked).toBe(false);
    expect(checkbox.dataset.indeterminate).toBe("true");

    // switch to checked
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(checkbox.dataset.indeterminate).toBe("false");

    // switch to uncheckd
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    expect(checkbox.dataset.indeterminate).toBe("false");

    // switch to indeterminate
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    expect(checkbox.dataset.indeterminate).toBe("true");
  });
});
