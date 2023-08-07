"use client";
import { createContext, useContext, useState } from "react";

interface AlertContextValue {
  isShowAlert: boolean;
  setIsShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertMessage: string;
  showAlert: (message: string) => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message: string) => {
    setIsShowAlert(!isShowAlert);
    setAlertMessage(message);
  };

  const value: AlertContextValue = {
    isShowAlert,
    alertMessage,
    setIsShowAlert,
    showAlert,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlertContext must be used within a AlertProvider");
  }
  return context;
};
