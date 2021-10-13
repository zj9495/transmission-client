import React, { useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tab,
  useMediaQuery,
} from "@material-ui/core";
import { TabList } from "@material-ui/lab";
import TabContext, { useTabContext } from "@material-ui/lab/TabContext";
import { useTheme } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

import { useSnackbar } from "notistack";
import { pick, cloneDeep } from "lodash";

import { getSessionSelector } from "src/store/selector/session";
import { getSessionAction } from "src/store/actions/session";
import type { SessionFormData } from "src/types";
import { setSession } from "src/api";

import Base from "./Base";
import Network from "./Network";
import Bandwidth from "./Bandwidth";
// import Alternative from "./Alternative";

type Props = {
  open: boolean;
  onClose: () => void;
};

type SelectedTab = "base" | "network" | "limit" | "altSpeed";

type TabPanelProps = {
  value: SelectedTab;
  children: React.ReactNode;
};

export const TabPanel = (props: TabPanelProps) => {
  const { value, children } = props;
  const context = useTabContext();
  return (
    <div
      style={{
        display: context?.value === value ? "block" : "none",
        padding: "24px",
      }}
    >
      {children}
    </div>
  );
};

type numberSessionField =
  | "cacheSizeMb"
  | "downloadQueueSize"
  | "seedQueueSize"
  | "peerPort"
  | "speedLimitDown"
  | "speedLimitUp"
  | "peerLimitGlobal"
  | "peerLimitPerTorrent"
  | "seedRatioLimit"
  | "idleSeedingLimit"
  | "queueStalledMinutes";

const formatFormData = (formData: SessionFormData) => {
  const result = cloneDeep(formData);
  const numberFields: numberSessionField[] = [
    "cacheSizeMb",
    "downloadQueueSize",
    "seedQueueSize",
    "peerPort",
    "speedLimitDown",
    "speedLimitUp",
    "peerLimitGlobal",
    "peerLimitPerTorrent",
    "seedRatioLimit",
    "idleSeedingLimit",
    "queueStalledMinutes",
  ];

  numberFields.forEach((field) => {
    if (result[field] !== undefined) {
      result[field] = Number(formData[field]);
    }
  });

  return result;
};

const Settings = (props: Props) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const methods = useForm();
  const session = useSelector(getSessionSelector);
  const { enqueueSnackbar } = useSnackbar();

  const { open, onClose } = props;

  useEffect(() => {
    if (session) {
      const data: SessionFormData = pick(session, [
        "renamePartialFiles",
        "startAddedTorrents",
        "downloadDir",
        "incompleteDirEnabled",
        "incompleteDir",
        "cacheSizeMb",
        "scriptTorrentDoneEnabled",
        "scriptTorrentDoneFilename",
        "configDir",
        "downloadQueueEnabled",
        "downloadQueueSize",
        "seedQueueEnabled",
        "seedQueueSize",
        "peerPortRandomOnStart",
        "peerPort",
        "blocklistEnabled",
        "blocklistUrl",
        "encryption",
        "portForwardingEnabled",
        "lpdEnabled",
        "utpEnabled",
        "dhtEnabled",
        "pexEnabled",
        "speedLimitDownEnabled",
        "speedLimitDown",
        "speedLimitUpEnabled",
        "speedLimitUp",
        "peerLimitGlobal",
        "peerLimitPerTorrent",
        "seedRatioLimited",
        "seedRatioLimit",
        "idleSeedingLimitEnabled",
        "idleSeedingLimit",
        "queueStalledEnabled",
        "queueStalledMinutes",
      ]);
      methods.reset({
        ...data,
      });
    }
  }, [session]);

  const [selectedTab, setSelectedTab] = useState<SelectedTab>("base");

  const handleChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newValue: SelectedTab
  ) => {
    setSelectedTab(newValue);
  };

  const onSubmit = (formData: SessionFormData) => {
    setSession(formatFormData(formData)).then((res) => {
      const { result } = res.data;
      const isSuccess = result === "success";

      enqueueSnackbar(
        isSuccess ? intl.formatMessage({ id: "message.saved" }) : result.result,
        {
          variant: isSuccess ? "success" : "error",
        }
      );

      dispatch(getSessionAction());
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle id="alert-dialog-title">
        <FormattedMessage id="toolbar.systemConfig" />
      </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TabContext value={selectedTab}>
              <TabList
                onChange={handleChange}
                indicatorColor="primary"
                variant="fullWidth"
                centered
              >
                <Tab
                  label={intl.formatMessage({
                    id: "dialog.systemConfig.tabs.base",
                  })}
                  value="base"
                />
                <Tab
                  label={intl.formatMessage({
                    id: "dialog.systemConfig.tabs.network",
                  })}
                  value="network"
                />
                <Tab
                  label={intl.formatMessage({
                    id: "dialog.systemConfig.tabs.limit",
                  })}
                  value="limit"
                />
                {/* <Tab
                  label={intl.formatMessage({
                    id: "dialog.systemConfig.tabs.altSpeed",
                  })}
                  value="altSpeed"
                /> */}
              </TabList>
              <TabPanel value="base">
                <Base />
              </TabPanel>
              <TabPanel value="network">
                <Network />
              </TabPanel>
              <TabPanel value="limit">
                <Bandwidth />
              </TabPanel>
              <TabPanel value="altSpeed">{/* <Alternative /> */}</TabPanel>
            </TabContext>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          <FormattedMessage id="dialog.public.buttonCancel" />
        </Button>
        <Button
          type="submit"
          autoFocus
          color="primary"
          startIcon={<SaveIcon />}
          onClick={methods.handleSubmit(onSubmit)}
        >
          <FormattedMessage id="dialog.public.buttonOk" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
