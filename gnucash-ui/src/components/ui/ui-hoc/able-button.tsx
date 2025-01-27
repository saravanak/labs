import * as React from 'react';
import { ButtonProps } from '../button';
import { useSession } from 'next-auth/react';

/**
 * Potential recursive imports to "../button"
 */

const AbilifiedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, enabledOnDemo, showAlways, ...props }, ref) => {
    const { data: userSession }: any = useSession();

    const isDemoMode = userSession && userSession.user.isDemoUser;
    let calculatedDisabled = isDemoMode
      ? enabledOnDemo
        ? false
        : true
      : disabled;
    if (showAlways) {
      calculatedDisabled = false
    }
    return <button ref={ref} disabled={calculatedDisabled} {...props} />;
  }
);

AbilifiedButton.displayName = 'abilified-button';
export { AbilifiedButton };
