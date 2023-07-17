import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

import { postSignup } from "../../../services/auth";
import { CLIENT_ROUTES, LOCAL_STORAGE_KEYS } from "../../../constants";

import type { TSignUpFormValues } from "../type";

const useSignup = () => {
  const {
    register,
    handleSubmit: _handleSubmit,
    formState,
    getValues,
  } = useForm<TSignUpFormValues>({
    defaultValues: {
      firstName: "Test",
      lastName: "User",
      middleName: "Mid guy",
      email: "test@gmail.com",
      phoneNumber: "1234567890",
      loginPasscode: "123456",
      acceptTerms: true,
    },
  });
  const navigate = useNavigate();
  const signUpMutation = useMutation(postSignup, {
    onSuccess: () => {
      // ...
    },
  });

  // const signUpMutationState = useMemo(
  //   () => ({
  //     isLoading: signUpMutation.isLoading,
  //     error: signUpMutation.error as AxiosError,
  //     isError: signUpMutation.isError,
  //   }),
  //   [signUpMutation.isLoading, signUpMutation.error, signUpMutation.isError]
  // );

  const handleSubmit = () => {
    return _handleSubmit((data: TSignUpFormValues) => {
      signUpMutation.mutate(data);
    });
  };

  const handleToast = (message: string) => {
    // toast.error(message, {
    //   position: "top-right",
    // }); // TODO: Fix toast

    alert(message); // TODO: Remove this after fixing toast
  };

  // useEffect(() => {
  //   if (signInMutationState.isError) {
  //     handleToast("Invalid credentials. Please try again!");
  //   }
  // }, [signInMutationState.isError]);

  useEffect(() => {
    if (formState.errors.acceptTerms?.message) {
      handleToast(formState.errors.acceptTerms?.message);
    }
  }, [formState.errors.acceptTerms?.message, formState.submitCount]);

  // TODO: Add useEffect for signUpMutationState.isSuccess
  // call another mutation to send email verification

  // useEffect(()=> {
  //   sendEmailVerification.mutate({
  //     email: getValues("email"),
  //   });

  // }, [signInMutationState.isSuccess])

  useEffect(() => {
    //TODO: remove this when the signup mutation is implemented
    if (formState.isSubmitSuccessful) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.signupSuccess,
        JSON.stringify({
          // email: data.email, // TODO: uncomment this after adding mutation
          email: "test@gmail.com", // TODO: remove this after adding mutation
          time: new Date().getTime(),
        })
      );

      navigate(CLIENT_ROUTES.authEmail);
    }
  }, [
    formState.isSubmitSuccessful, // TODO: remove this when the signup mutation is implemented
    // signUpMutationState.isSuccess // TODO: uncomment this when the signup mutation is implemented
  ]);

  return {
    // mutationState: signInMutationState,
    errors: formState.errors,
    handleSubmit,
    register,
  };
};

export default useSignup;
