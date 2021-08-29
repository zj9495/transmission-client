/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useSnackbar } from "notistack";

import {
  TextField,
  Grid,
  InputAdornment,
  Checkbox,
  Button,
  Box,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import SeedModeCheckbox from "src/components/SeedModeCheckbox";
import { useTorrentSettings } from "src/hooks/swr";
import { setTorrentSettings } from "src/api";
import type { TorrentId, OriginTorrentSettings } from "src/types";

type Props = {
  id: TorrentId | null;
};

type FormInputs = {
  downloadLimit: string;
  downloadLimited: boolean;
  peerLimit: string;
  seedIdleLimit: string;
  seedIdleMode: number;
  seedRatioLimit: string;
  seedRatioMode: number;
  uploadLimit: string;
  uploadLimited: boolean;
};

const TorrentSettings = ({ id }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const { data } = useTorrentSettings(id);
  const { register, control, handleSubmit, reset, errors } = useForm();
  React.useEffect(() => {
    if (!data) {
      return;
    }
    reset({
      ...data,
    });
  }, [data]);
  const onSubmit = (formData: FormInputs) => {
    setLoading(true);
    const params: OriginTorrentSettings = {
      ...formData,
      downloadLimit: Number(formData.downloadLimit),
      "peer-limit": Number(formData.peerLimit),
      seedIdleLimit: Number(formData.seedIdleLimit),
      seedRatioLimit: Number(formData.seedRatioLimit),
      uploadLimit: Number(formData.uploadLimit),
    };
    setTorrentSettings(id as TorrentId, params)
      .then((res) => {
        if (res.data.result === "success") {
          enqueueSnackbar("Success");
        } else {
          enqueueSnackbar(res.data.result, {
            variant: "error",
          });
        }
      })
      .catch(() => {
        enqueueSnackbar(<FormattedMessage id="message.unknownError" />, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Controller
                    name="downloadLimited"
                    control={control}
                    render={({ value, onChange }) => (
                      <Checkbox
                        color="primary"
                        checked={Boolean(value)}
                        onChange={(e) => onChange(e.target.checked)}
                      />
                    )}
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              "data-testid": "download-dir",
            }}
            error={!!errors.downloadLimit}
            name="downloadLimit"
            label={
              <FormattedMessage id="torrent.attribute.label.downloadLimited" />
            }
            fullWidth
            inputRef={register}
            helperText={errors.downloadLimit?.message || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Controller
                    name="uploadLimited"
                    control={control}
                    render={({ value, onChange }) => (
                      <Checkbox
                        color="primary"
                        checked={Boolean(value)}
                        onChange={(e) => onChange(e.target.checked)}
                      />
                    )}
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              "data-testid": "download-dir",
            }}
            error={!!errors.uploadLimit}
            name="uploadLimit"
            label={
              <FormattedMessage id="torrent.attribute.label.uploadLimited" />
            }
            fullWidth
            inputRef={register}
            helperText={errors.uploadLimit?.message || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Controller
                    name="seedRatioMode"
                    control={control}
                    render={(props) => <SeedModeCheckbox {...props} />}
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              "data-testid": "download-dir",
            }}
            error={!!errors.seedRatioLimit}
            name="seedRatioLimit"
            label={
              <FormattedMessage id="torrent.attribute.label.seedRatioMode" />
            }
            fullWidth
            inputRef={register}
            helperText={errors.seedRatioLimit?.message || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Controller
                    name="seedIdleMode"
                    control={control}
                    render={(props) => <SeedModeCheckbox {...props} />}
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              "data-testid": "download-dir",
            }}
            error={!!errors.seedIdleLimit}
            name="seedIdleLimit"
            label={
              <FormattedMessage id="torrent.attribute.label.seedIdleMode" />
            }
            fullWidth
            inputRef={register}
            helperText={errors.seedIdleLimit?.message || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              "data-testid": "download-dir",
            }}
            error={!!errors.peerLimit}
            name="peerLimit"
            label={<FormattedMessage id="torrent.attribute.label.peerLimit" />}
            fullWidth
            inputRef={register}
            helperText={errors.peerLimit?.message || ""}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              color="primary"
              disabled={loading}
              startIcon={<SaveIcon />}
            >
              <FormattedMessage
                id={
                  loading
                    ? "dialog.systemConfig.saving"
                    : "dialog.public.buttonSave"
                }
              />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(TorrentSettings);
