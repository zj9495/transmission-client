/* eslint-disable react/jsx-no-duplicate-props */

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";

import {
  TextField,
  Grid,
  Switch,
  MenuItem,
  FormControlLabel,
  Button,
} from "@material-ui/core";

import TextFieldWithSwitch from "src/components/TextFieldWithSwitch";
import BlocklistField from "src/components/Settings/BlocklistField";
import PortField from "src/components/Settings/PortField";

const Network = () => {
  const { register, control, errors } = useFormContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextFieldWithSwitch
          textFieldName="downloadQueueSize"
          switchName="downloadQueueEnabled"
          labelId="dialog.systemConfig.downloadQueueEnabled"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextFieldWithSwitch
          textFieldName="seedQueueSize"
          switchName="seedQueueEnabled"
          labelId="dialog.systemConfig.seedQueueEnabled"
          TextFieldProps={{ type: "number" }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <PortField />
      </Grid>

      <Grid item xs={12} sm={6}>
        <BlocklistField />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name="encryption"
          control={control}
          render={({ value, onChange }) => (
            <TextField
              select
              name="encryption"
              variant="outlined"
              size="small"
              value={value}
              error={!!errors.encryption}
              label={<FormattedMessage id="dialog.systemConfig.encryption" />}
              fullWidth
              onChange={(e) => onChange(e.target.value)}
              helperText={errors.encryption?.message || ""}
            >
              <MenuItem value="required">
                <FormattedMessage id="dialog.systemConfig.encryptionType.required" />
              </MenuItem>
              <MenuItem value="preferred">
                <FormattedMessage id="dialog.systemConfig.encryptionType.preferred" />
              </MenuItem>
              <MenuItem value="tolerated">
                <FormattedMessage id="dialog.systemConfig.encryptionType.tolerated" />
              </MenuItem>
            </TextField>
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name="portForwardingEnabled"
          control={control}
          render={({ value, onChange }) => (
            <FormControlLabel
              label={
                <FormattedMessage id="dialog.systemConfig.portForwardingEnabled" />
              }
              control={
                <Switch
                  inputProps={{
                    // waiting for https://github.com/microsoft/TypeScript/issues/28960
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "data-testid": "rename-partial-files",
                  }}
                  name="portForwardingEnabled"
                  size="small"
                  checked={Boolean(value)}
                  color="primary"
                  onChange={(e) => onChange(e.target.checked)}
                />
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="lpdEnabled"
          control={control}
          render={({ value, onChange }) => (
            <FormControlLabel
              label={<FormattedMessage id="dialog.systemConfig.lpdEnabled" />}
              control={
                <Switch
                  inputProps={{
                    // waiting for https://github.com/microsoft/TypeScript/issues/28960
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "data-testid": "rename-partial-files",
                  }}
                  name="lpdEnabled"
                  size="small"
                  checked={Boolean(value)}
                  color="primary"
                  onChange={(e) => onChange(e.target.checked)}
                />
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="utpEnabled"
          control={control}
          render={({ value, onChange }) => (
            <FormControlLabel
              label={<FormattedMessage id="dialog.systemConfig.utpEnabled" />}
              control={
                <Switch
                  inputProps={{
                    // waiting for https://github.com/microsoft/TypeScript/issues/28960
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "data-testid": "rename-partial-files",
                  }}
                  name="utpEnabled"
                  size="small"
                  checked={Boolean(value)}
                  color="primary"
                  onChange={(e) => onChange(e.target.checked)}
                />
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="dhtEnabled"
          control={control}
          render={({ value, onChange }) => (
            <FormControlLabel
              label={<FormattedMessage id="dialog.systemConfig.dhtEnabled" />}
              control={
                <Switch
                  inputProps={{
                    // waiting for https://github.com/microsoft/TypeScript/issues/28960
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "data-testid": "rename-partial-files",
                  }}
                  name="dhtEnabled"
                  size="small"
                  checked={Boolean(value)}
                  color="primary"
                  onChange={(e) => onChange(e.target.checked)}
                />
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="pexEnabled"
          control={control}
          render={({ value, onChange }) => (
            <FormControlLabel
              label={<FormattedMessage id="dialog.systemConfig.pexEnabled" />}
              control={
                <Switch
                  inputProps={{
                    // waiting for https://github.com/microsoft/TypeScript/issues/28960
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "data-testid": "rename-partial-files",
                  }}
                  name="pexEnabled"
                  size="small"
                  checked={Boolean(value)}
                  color="primary"
                  onChange={(e) => onChange(e.target.checked)}
                />
              }
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Network;
