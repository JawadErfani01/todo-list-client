"use client";
import { useEffect } from "react";
import { useAlertContext } from "../context/AlertContext";

const CustomAlert: React.FC = () => {
  const { isShowAlert, alertMessage, setIsShowAlert } = useAlertContext();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isShowAlert]); // Passing an empty dependency array to run the effect only once

  return (
    isShowAlert && (
      <div className="shadow-lg shadow-green-100 rounded-xl  capitalize p-3  w-[60%] sm:w-[30%] mt-6  text-sm">
        <span>{alertMessage}</span>
      </div>
    )
  );
};

export default CustomAlert;
