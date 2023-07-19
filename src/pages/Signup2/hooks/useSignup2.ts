import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import type { TSignUpFormValues } from "../type";
import { useMutation } from "react-query";
import { postSignIn, postSignup } from "../../../services/auth";
import { AxiosError } from "axios";

const useSignin = () => {
  const signUpMutation = useMutation(postSignup, {
    onSuccess: ({ email }) => {
      // localStorage.setItem("token", token.em); // TODO: remove this after fixing cookie issue on the backend
      window.location.reload();
    },
  });

  const handleSignIn = (formValues: TSignUpFormValues) => {
    signUpMutation.mutate(formValues);
  };

  const signUpMutationState = useMemo(
    () => ({
      isLoading: signUpMutation.isLoading,
      error: signUpMutation.error as AxiosError,
      isError: signUpMutation.isError,
    }),
    [signUpMutation.isLoading, signUpMutation.error, signUpMutation.isError]
  );

  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormValues>({
    defaultValues: {
      acceptTerms: true,
    },
  });

  const handleSubmit = () => {
    return _handleSubmit((formValues: TSignUpFormValues) => {
      handleSignIn(formValues);
    });
  };

  const handleToast = (message: string) => {
    // toast.error(message, {
    //   position: "top-right",
    // }); // TODO: Fix toast

    alert(message); // TODO: Remove this after fixing toast
  };

  useEffect(() => {
    if (signUpMutationState.isError) {
      handleToast("Invalid credentials. Please try again!");
    }
  }, [signUpMutationState.isError]);

  return {
    mutationState: signUpMutationState,
    errors,
    handleSubmit,
    register,
  };
};

export default useSignin;
