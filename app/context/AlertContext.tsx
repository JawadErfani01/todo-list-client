"use client";
// Import necessary dependencies from React
import { createContext, useContext, useState } from "react";

// Define the shape of the context value object
interface AlertContextValue {
  isShowAlert: boolean;
  setIsShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertMessage: string;
  showAlert: (message: string) => void;
}

// Create a new AlertContext with an initial value of `undefined`
const AlertContext = createContext<AlertContextValue | undefined>(undefined);

// Define the AlertProvider component
export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Set up state for managing isShowAlert and alertMessage
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Function to show the alert
  const showAlert = (message: string) => {
    setIsShowAlert(!isShowAlert);
    setAlertMessage(message);
  };

  // Create the value object to be provided to consumers of the context
  const value: AlertContextValue = {
    isShowAlert,
    alertMessage,
    setIsShowAlert,
    showAlert,
  };

  // Render the AlertProvider and provide the value to its consumers
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

// Custom hook to use the alert context
export const useAlertContext = () => {
  // Get the context object
  const context = useContext(AlertContext);

  // Throw an error if the hook is used outside of the AlertProvider component
  if (!context) {
    throw new Error("useAlertContext must be used within a AlertProvider");
  }

  return context;
};
