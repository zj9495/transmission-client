/* eslint-disable react/jsx-no-duplicate-props */

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";

import {
  TextField,
  Grid,
  InputAdornment,
  FormControlLabel,
  Switch,
  FormGroup,
  Checkbox,
} from "@material-ui/core";

const Alternative = () => {
  const { register, control, errors } = useFormContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          type="number"
          error={!!errors.altSpeedDown}
          name="altSpeedDown"
          label={<FormattedMessage id="dialog.systemConfig.altSpeedDown" />}
          fullWidth
          inputRef={register}
          InputProps={{
            endAdornment: <InputAdornment position="end">KB/s</InputAdornment>,
          }}
          helperText={errors.altSpeedDown?.message || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="number"
          error={!!errors.altSpeedUp}
          name="altSpeedUp"
          label={<FormattedMessage id="dialog.systemConfig.altSpeedUp" />}
          fullWidth
          inputRef={register}
          InputProps={{
            endAdornment: <InputAdornment position="end">KB/s</InputAdornment>,
          }}
          helperText={errors.altSpeedUp?.message || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="altSpeedTimeEnabled"
          control={control}
          render={({ value, onChange }) => (
            <FormControlLabel
              label={
                <FormattedMessage id="dialog.systemConfig.altSpeedTimeEnabled" />
              }
              control={
                <Switch
                  name="altSpeedTimeEnabled"
                  checked={Boolean(value)}
                  color="primary"
                  inputRef={register}
                  onChange={(e) => onChange(e.target.checked)}
                />
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox name="gilad" />}
            label="Gilad Gray"
          />
          <FormControlLabel
            control={<Checkbox name="jason" />}
            label="Jason Killian"
          />
          <FormControlLabel
            control={<Checkbox name="antoine" />}
            label="Antoine Llorca"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default Alternative;
