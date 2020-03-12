import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import { appMessages } from '../../app.messages';
import { auth, Auth } from '../../firebase';
import { updateUser } from '../../firebase/store/update-user';
import { Anchor } from '../../shared/anchor';
import {
  Button,
  Form,
  FormContent,
  FormFooter,
  FormHeader,
  Info,
  InputError,
  InputText,
  Label,
  LabelText,
  Separator
} from '../../shared/form';

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface SignInProps {
  onSuccess?: (credential: firebase.auth.UserCredential) => void;
  onSignUpClick?: () => void;
}

export const SignIn: FC<SignInProps> = ({ onSuccess, onSignUpClick }) => {
  const { formatMessage } = useIntl();

  const { handleSubmit, register, errors, formState, setError } = useForm<
    SignInFormValues
  >({ mode: 'onBlur' });

  const onGoogleSignIn = useCallback(
    () =>
      auth
        .signInWithPopup(new Auth.GoogleAuthProvider())
        .then(async credential => {
          if (credential.user) {
            await updateUser(credential.user.uid);
          }
          return credential;
        })
        .then(onSuccess)
        .catch(error => {
          console.error(error);
          alert(error.message);
        }),
    [onSuccess]
  );

  const onSignIn = useCallback(
    ({ email, password }) =>
      auth
        .signInWithEmailAndPassword(email, password)
        .then(async credential => {
          if (credential.user) {
            await updateUser(credential.user.uid);
          }
          return credential;
        })
        .then(onSuccess)
        .catch(error => {
          if (
            ['auth/user-not-found', 'auth/wrong-password'].includes(error.code)
          ) {
            setError('password', '', formatMessage(appMessages.invalidLogin));
          }

          if (['auth/too-many-requests'].includes(error.code)) {
            setError(
              'password',
              '',
              formatMessage(appMessages.tooManyRequests)
            );
          }
          console.error(error);
        }),
    [formatMessage, onSuccess, setError]
  );

  return (
    <Form onSubmit={handleSubmit(onSignIn)} noValidate>
      <FormHeader>{formatMessage(appMessages.signInToSite)}</FormHeader>
      <FormContent>
        <Label>
          <LabelText>
            <div>{formatMessage(appMessages.email)}</div>
            {errors.email && <InputError>{errors.email.message}</InputError>}
          </LabelText>
          <InputText
            name="email"
            type="email"
            status={errors.email ? 'error' : undefined}
            ref={register({
              required: formatMessage(appMessages.required),
              validate: value =>
                isEmail(value) || formatMessage(appMessages.invalidEmail)
            })}
          />
        </Label>
        <Label>
          <LabelText>
            <div>{formatMessage(appMessages.password)}</div>
            {errors.password && (
              <InputError>{errors.password.message}</InputError>
            )}
          </LabelText>
          <InputText
            name="password"
            type="password"
            status={errors.password ? 'error' : undefined}
            ref={register({
              required: formatMessage(appMessages.required),
              validate: value =>
                isLength(value, { min: 3 }) ||
                formatMessage(appMessages.invalidPassword, { min: 3 })
            })}
          />
        </Label>
      </FormContent>
      <FormFooter>
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          pending={formState.isSubmitting}
        >
          {formatMessage(appMessages.signIn)}
        </Button>
        <Separator>{formatMessage(appMessages.or)}</Separator>
        <Button
          type="button"
          disabled={formState.isSubmitting}
          pending={formState.isSubmitting}
          onClick={onGoogleSignIn}
        >
          {formatMessage(appMessages.signInWithGoogle)}
        </Button>
        <Info>
          {formatMessage(appMessages.notMember)}
          <Anchor as="button" onClick={onSignUpClick}>
            {formatMessage(appMessages.signUpNow)}
          </Anchor>
        </Info>
      </FormFooter>
    </Form>
  );
};

export default SignIn;
