import React from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useFormContext } from "react-hook-form";

import TextFieldWithSwitch from "src/components/TextFieldWithSwitch";
import { updateBlocklist, setSession } from "src/api";

const BlocklistField = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { watch } = useFormContext();
  const blocklistEnabled: boolean = watch("blocklistEnabled");
  const blocklistUrl: string = watch("blocklistUrl");

  const handleUpdate = async () => {
    await setSession({ blocklistUrl });
    updateBlocklist().then((res) => {
      if (res.data.result === "success") {
        enqueueSnackbar(<FormattedMessage id="message.updated" />);
      } else {
        enqueueSnackbar(res.data.result, {
          variant: "error",
        });
      }
    });
  };

  return (
    <TextFieldWithSwitch
      textFieldName="blocklistUrl"
      switchName="blocklistEnabled"
      labelId="dialog.systemConfig.blocklistEnabled"
      TextFieldProps={{
        InputProps: {
          endAdornment: (
            <Button
              size="small"
              disabled={!blocklistEnabled}
              onClick={handleUpdate}
            >
              <FormattedMessage id="dialog.public.buttonUpdate" />
            </Button>
          ),
        },
      }}
    />
  );
};

export default BlocklistField;
