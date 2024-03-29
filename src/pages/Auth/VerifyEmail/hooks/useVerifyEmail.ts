import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

import { postVerifyEmail } from "@services/auth";

import { LOCAL_STORAGE_KEYS } from "@constants/index";
import { CLIENT_ROUTES } from "@constants/routes";

import { TResendDetails, TVerifyEmailFormValues } from "../type";
import useQueryCodeValue from "@hooks/useQueryCodeValue";

const RESEND_SECONDS = 45;
const RESEND_BUTTON_ENABLED_TEXT = "You can resend now!";

const useVerifyEmail = () => {
  const navigate = useNavigate();
  const VerifyEmailMutation = useMutation(postVerifyEmail, {
    onSuccess: () => {
      navigate(CLIENT_ROUTES.authSignin);
    },
  });

  const handleResendButtonClick = () => {
    navigate(CLIENT_ROUTES.authResendEmail);
  };

  const handleVerifyEmail = (formValues: TVerifyEmailFormValues) => {
    VerifyEmailMutation.mutate(formValues.code);
  };

  const mutationState = useMemo(() => {
    const error = VerifyEmailMutation.error as AxiosError;
    let message = (error?.response?.data as { message: string })?.message;

    return {
      isLoading: VerifyEmailMutation.isLoading,
      error: message,
      isError: VerifyEmailMutation.isError,
    };
  }, [VerifyEmailMutation.isLoading, VerifyEmailMutation.error, VerifyEmailMutation.isError]);

  const {
    register,
    handleSubmit: _handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TVerifyEmailFormValues>();
  useQueryCodeValue<TVerifyEmailFormValues>({
    formSetValue: setValue,
    formValueName: "code",
  });

  const handleSubmit = () => {
    return _handleSubmit((formValues: TVerifyEmailFormValues) => {
      handleVerifyEmail(formValues);
    });
  };

  const handleToast = (message: string) => {
    // toast.error(message, {
    //   position: "top-right",
    // }); // TODO: Fix toast

    alert(message); // TODO: Remove this after fixing toast
  };

  useEffect(() => {
    if (mutationState.isError) {
      handleToast(mutationState.error);
    }
  }, [mutationState.isError, mutationState.error]);

  const [resendDetails, setResendDetails] = useState<TResendDetails>({
    email: "",
    savedAtTime: "",
    timeSecondsLeft: 0,
  });

  const resendDetailsTimeSecondsLeftIntervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const item = localStorage.getItem(LOCAL_STORAGE_KEYS.sendEmailCodeSuccess);

    let resendDetails: Omit<TResendDetails, "timeSecondsLeft"> | null = null;

    if (typeof item === "string") {
      resendDetails = JSON.parse(item) as Omit<TResendDetails, "timeSecondsLeft">;
    }

    if (resendDetails) {
      setResendDetails({
        ...resendDetails,
        timeSecondsLeft:
          RESEND_SECONDS - Math.floor((new Date().getTime() - new Date(resendDetails.savedAtTime).getTime()) / 1000),
      });
    }
  }, []);

  useEffect(() => {
    if (resendDetails.timeSecondsLeft !== -1 && resendDetails.timeSecondsLeft > 0) {
      resendDetailsTimeSecondsLeftIntervalId.current = setInterval(() => {
        setResendDetails((prev) => ({
          ...prev,
          timeSecondsLeft: prev.timeSecondsLeft - 1,
        }));
      }, 1000);
    }

    return () => {
      if (resendDetailsTimeSecondsLeftIntervalId.current) {
        clearInterval(resendDetailsTimeSecondsLeftIntervalId.current);
      }
    };
  }, [resendDetails.timeSecondsLeft]);

  useEffect(() => {
    if (resendDetails.timeSecondsLeft !== 0 && resendDetails.savedAtTime) return;
    if (resendDetailsTimeSecondsLeftIntervalId.current === null) return;

    clearInterval(resendDetailsTimeSecondsLeftIntervalId.current);
  }, [resendDetails.timeSecondsLeft, resendDetails.savedAtTime]);

  // useEffect(() => {
  //   if (!resendDetails.email) return;

  //   console.log(resendDetails);
  // }, [resendDetails.email]);

  return {
    mutationState,
    resendDetails,
    errors,
    handleResendButtonClick,
    handleSubmit,
    register,
  };
};

export default useVerifyEmail;

export { RESEND_SECONDS, RESEND_BUTTON_ENABLED_TEXT };
