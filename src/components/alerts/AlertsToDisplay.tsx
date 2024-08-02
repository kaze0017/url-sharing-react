import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { RootState } from "../../state/store";
import { removeAlert } from "../../state/alerts/alertsSlice";
import { useSnackbar } from "notistack";


const AlertsDisplay: React.FC = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state: RootState) => state.alerts.alerts);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    alerts.forEach((alert) => {
      enqueueSnackbar(alert.message, {
        variant: alert.severity,
        key: alert.id,
        onClose: () => dispatch(removeAlert(alert.id)),
        autoHideDuration: 5000,
      });
    });
  }, [alerts, enqueueSnackbar, dispatch]);

  return null;
};

export default AlertsDisplay;