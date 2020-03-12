import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import { appMessages } from '../../app.messages';
import { auth } from '../../firebase';
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
  LabelText
} from '../../shared/form';

export interface SignUpFormValues {
  email: string;
  password: string;
}

export interface SignUpProps {
  onSuccess?: (credential: firebase.auth.UserCredential) => void;
  onSignInClick?: () => void;
}

export const SignUp: FC<SignUpProps> = ({ onSuccess, onSignInClick }) => {
  const { formatMessage } = useIntl();

  const onSignUp = useCallback(
    ({ email, password }: SignUpFormValues) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async credential => {
          if (credential.user) {
            await updateUser(credential.user.uid);
          }
          return credential;
        })
        .then(onSuccess)
        .catch(console.error);
    },
    [onSuccess]
  );

  const { handleSubmit, register, errors, formState } = useForm<
    SignUpFormValues
  >();

  return (
    <Form onSubmit={handleSubmit(onSignUp)} noValidate>
      <FormHeader>{formatMessage(appMessages.signUpToSite)}</FormHeader>
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
                isLength(value, { min: 6 }) ||
                formatMessage(appMessages.invalidPassword, { min: 6 })
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
          {formatMessage(appMessages.signUp)}
        </Button>
        <Info>
          {formatMessage(appMessages.alreadyMember)}
          <Anchor as="button" onClick={onSignInClick}>
            {formatMessage(appMessages.signIn)}
          </Anchor>
        </Info>
      </FormFooter>
    </Form>
  );
};

export default SignUp;
