import React from "react";
import { MenuItem, TextField } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

import { LANGUAGES } from "src/constants";
import { setLocale } from "src/store/actions/app";
import { getLocale } from "src/store/selector/app";

export default function LanguageToggle() {
  const dispatch = useDispatch();

  const locale = useSelector(getLocale);

  const handleLanguageMenuItemClick = (code: string) => {
    dispatch(setLocale(code));
  };

  return (
    <TextField
      value={locale}
      select
      fullWidth
      size="small"
      name="language"
      variant="outlined"
      label={<FormattedMessage id="changeLanguage" />}
      id="select-language"
      SelectProps={{
        MenuProps: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          "data-testid": "language-menu",
        },
      }}
    >
      {LANGUAGES.map((language) => (
        <MenuItem
          id={`lang-item-${language.code}`}
          data-no-link="true"
          key={language.code}
          value={language.code}
          selected={locale === language.code}
          onClick={() => {
            handleLanguageMenuItemClick(language.code);
          }}
          lang={language.code}
        >
          {language.text}
        </MenuItem>
      ))}
    </TextField>
  );
}
