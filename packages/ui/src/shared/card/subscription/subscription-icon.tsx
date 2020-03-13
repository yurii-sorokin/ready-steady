import format from 'date-fns/format';
import React, { forwardRef, useCallback, memo } from 'react';
import { useModal } from 'react-modal-hook';
import { up } from 'styled-breakpoints';
import styled, { css } from 'styled-components';
import { ifNotProp, Size, theme } from '../../../design-system';
import { SubscriptionType } from '../../../firebase/store';
import { useAddSubscription } from '../../../hooks/use-add-subscription';
import { useCurrentUser } from '../../../hooks/use-current-user';
import { useRemoveSubscription } from '../../../hooks/use-remove-subscription';
import { useToggle } from '../../../hooks/use-toggle';
import { SignIn } from '../../../screens/signin';
import { SignUp } from '../../../screens/signup';
import { BellIcon } from '../../icon/bell';
import { LikeIcon } from '../../icon/like';
import { Modal } from '../../modal';
import { Card } from '../card';
import { requestPermission } from '../../../notifications';

export interface SubscriptionBellProps {
  on: boolean;
  type: SubscriptionType;
  id: string | number;
  date: string;
  title: string;
}

const now = format(new Date(), 'yyyy-MM-dd');

const SubscriptionIconUnstyled = memo(
  forwardRef(
    ({ on, id, type, date, title, ...props }: SubscriptionBellProps, ref) => {
      const { enabled: signIn, setOn, setOff } = useToggle(true);

      const addSubscription = useAddSubscription({
        id,
        type,
        date,
        title
      });
      const removeSubscription = useRemoveSubscription({
        id,
        type
      });

      const toggleSubscription = useCallback(
        () => (on ? removeSubscription() : addSubscription()),
        [addSubscription, on, removeSubscription]
      );

      const user = useCurrentUser();
      const [showModal, hideModal] = useModal(
        () => (
          <Modal onClose={hideModal} height="auto">
            {signIn ? (
              <SignIn onSuccess={hideModal} onSignUpClick={setOff} />
            ) : (
              <SignUp onSuccess={hideModal} onSignInClick={setOn} />
            )}
          </Modal>
        ),
        [signIn]
      );

      const onToggleSubscription = useCallback(() => {
        if (!user) {
          showModal();
        }

        requestPermission()
          .then(toggleSubscription)
          .catch(toggleSubscription);
      }, [showModal, toggleSubscription, user]);

      return date > now ? (
        <BellIcon {...props} on={on} onClick={onToggleSubscription} ref={ref} />
      ) : (
        <LikeIcon {...props} on={on} onClick={onToggleSubscription} ref={ref} />
      );
    }
  )
);

export const SubscriptionIcon = styled(SubscriptionIconUnstyled)`
  position: absolute;
  top: ${theme(t => t.space[1])};
  right: ${theme(t => t.space[1])};
  cursor: pointer;
  padding: 5px;
  background: ${theme(t => t.colors.card.normal)};
  box-shadow: ${theme(t => t.shadows.normal)};
  border-radius: 50%;
  z-index: 1;

  ${up(Size.lg)} {
    ${Card} & {
      ${ifNotProp(
        'on',
        css`
          display: none;
        `
      )};
    }

    ${Card}:hover & {
      display: block;
    }

    ${Card}[x-size="${Size.xs}"] &,
    ${Card}[x-size="${Size.xs}"]:hover & {
      display: none;
    }
  }
`;
