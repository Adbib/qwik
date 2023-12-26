import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { Slot, component$, useComputed$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

type NavLinkProps = QwikIntrinsicElements['a'] & {
  activeClass?: string;
  pendingClass?: string;
};

export const NavLink = component$(
  ({ activeClass, pendingClass, ...props }: NavLinkProps) => {
    const location = useLocation();
    const toPathname = props.href ?? '';
    const locationPathname = location.url.pathname;
    const isPenddingSig = useComputed$(() => location.isNavigating);

    const endSlashPosition =
      toPathname !== '/' && toPathname.endsWith('/')
        ? toPathname.length - 1
        : toPathname.length;
    const isActive =
      locationPathname === toPathname ||
      (locationPathname.endsWith(toPathname) &&
        locationPathname.charAt(endSlashPosition) === '/');

    return (
      <a
        class={`
          ${props.class || ''}  
          ${isActive ? activeClass : ''}
          ${isPenddingSig.value && isActive ? pendingClass : ''}
        `}
        {...props}
      >
        <Slot />
      </a>
    );
  }
);
