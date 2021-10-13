/* eslint-disable react/jsx-no-duplicate-props */

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";

import { TextField, Grid, InputAdornment } from "@material-ui/core";

import TextFieldWithSwitch from "src/components/TextFieldWithSwitch";

const Bandwidth = () => {
  const { register, errors } = useFormContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextFieldWithSwitch
          textFieldName="speedLimitDown"
          switchName="speedLimitDownEnabled"
          labelId="dialog.systemConfig.speedLimitDownEnabled"
          TextFieldProps={{
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">KB/s</InputAdornment>
              ),
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldWithSwitch
          textFieldName="speedLimitUp"
          switchName="speedLimitUpEnabled"
          labelId="dialog.systemConfig.speedLimitUpEnabled"
          TextFieldProps={{
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">KB/s</InputAdornment>
              ),
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="number"
          error={!!errors.peerLimitGlobal}
          name="peerLimitGlobal"
          variant="outlined"
          size="small"
          label={<FormattedMessage id="dialog.systemConfig.peerLimitGlobal" />}
          fullWidth
          inputRef={register}
          helperText={errors.peerLimitGlobal?.message || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="number"
          error={!!errors.peerLimitPerTorrent}
          name="peerLimitPerTorrent"
          variant="outlined"
          size="small"
          label={
            <FormattedMessage id="dialog.systemConfig.peerLimitPerTorrent" />
          }
          fullWidth
          inputRef={register}
          helperText={errors.peerLimitPerTorrent?.message || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldWithSwitch
          textFieldName="seedRatioLimit"
          switchName="seedRatioLimited"
          labelId="dialog.systemConfig.seedRatioLimited"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldWithSwitch
          textFieldName="idleSeedingLimit"
          switchName="idleSeedingLimitEnabled"
          labelId="dialog.systemConfig.idleSeedingLimitEnabled"
          TextFieldProps={{
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <FormattedMessage id="dialog.systemConfig.minutes" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldWithSwitch
          textFieldName="queueStalledMinutes"
          switchName="queueStalledEnabled"
          labelId="dialog.systemConfig.queueStalledEnabled"
          TextFieldProps={{
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <FormattedMessage id="dialog.systemConfig.minutes" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Bandwidth;
