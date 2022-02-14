import React from "react";
import { Center, Alert, AlertIcon } from "@chakra-ui/react";

type ErrorAlertProps = {
  type: string;
  status?: "error" | "success" | "warning" | "info";
};

const ErrorAlert = ({ type, status }: ErrorAlertProps) => {
  return (
    <Center>
      <Alert
        status={status ?? "error"}
        variant="subtle"
        data-testid="error-alert"
      >
        <AlertIcon />
        Could not retrieve {type}.
      </Alert>
    </Center>
  );
};

export default ErrorAlert;
