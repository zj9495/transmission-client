import React from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useFormContext } from "react-hook-form";

import TextFieldWithSwitch from "src/components/TextFieldWithSwitch";
import { testPort, setSession } from "src/api";

const PortField = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { watch } = useFormContext();
  const watchPeerPort = Number(watch("peerPort"));

  const handleTest = async () => {
    await setSession({ peerPort: watchPeerPort });
    testPort().then((res) => {
      if (res.data.arguments.portIsOpen) {
        enqueueSnackbar(
          <FormattedMessage id="dialog.systemConfig.portIsOpenTrue" />
        );
      } else {
        enqueueSnackbar(
          <FormattedMessage id="dialog.systemConfig.portIsOpenFalse" />,
          {
            variant: "error",
          }
        );
      }
    });
  };

  return (
    <TextFieldWithSwitch
      textFieldName="peerPort"
      switchName="peerPortRandomOnStart"
      labelId="dialog.systemConfig.peerPortRandomOnStart"
      readonlyOn="unChecked"
      TextFieldProps={{
        type: "number",
        InputProps: {
          endAdornment: (
            <Button size="small" onClick={handleTest}>
              <FormattedMessage id="dialog.systemConfig.testPort" />
            </Button>
          ),
        },
      }}
    />
  );
};

export default PortField;
