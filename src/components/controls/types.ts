import type React from 'react';

import type {DOMProps, QAProps} from '../types';

export type InputControlView = 'normal' | 'clear';

export type InputControlSize = 's' | 'm' | 'l' | 'xl';

export type InputControlPin =
    | 'round-round'
    | 'brick-brick'
    | 'clear-clear'
    | 'round-brick'
    | 'brick-round'
    | 'round-clear'
    | 'clear-round'
    | 'brick-clear'
    | 'clear-brick';

export type InputControlState = 'error';

export type BaseInputControlProps<T = Element> = DOMProps &
    QAProps & {
        /** The control's `autocomplete` attribute */
        autoComplete?: boolean | 'on' | 'off' | string;
        /** The control's `autofocus` attribute */
        autoFocus?: boolean;
        /** React ref provided to the control */
        controlRef?: React.Ref<T>;
        /** The control's default value. Use when the component is not controlled */
        defaultValue?: string;
        /** Indicates that the user cannot interact with the control */
        disabled?: boolean;
        /** Shows error state and optional message if property identified as a string
         * @deprecated use `errorMessage` instead
         */
        error?: string | boolean;
        /** Determines content of the error message */
        errorMessage?: React.ReactNode;
        /** Determines whether the error message will be placed under the input field as text or in the tooltip */
        errorPlacement?: 'text' | 'tooltip';
        /** Describes the validation state */
        validationState?: 'invalid';
        /** Shows icon for clearing control's value */
        hasClear?: boolean;
        /** The control's `id` attribute */
        id?: string;
        /** The control's `name` attribute. Will be autogenerated if not specified */
        name?: string;
        /** Fires when the control lost focus. Provides focus event as an callback's argument */
        onBlur?: React.FocusEventHandler<T>;
        /** Fires when the input’s value is changed by the user. Provides change event as an callback's argument */
        onChange?: React.ChangeEventHandler<T>;
        /** Fires when the control gets focus. Provides focus event as an callback's argument */
        onFocus?: React.FocusEventHandler<T>;
        /** Fires when a key is pressed. Provides keyboard event as an callback's argument */
        onKeyDown?: React.KeyboardEventHandler<T>;
        /** @deprecated use `onKeyDown` instead */
        onKeyPress?: React.KeyboardEventHandler<T>;
        /** Fires when a key is released. Provides keyboard event as an callback's argument */
        onKeyUp?: React.KeyboardEventHandler<T>;
        /** Fires when the input’s value is changed by the user. Provides new value as an callback's argument */
        onUpdate?: (value: string) => void;
        /** The control's border view. `'round-round'` by default */
        pin?: InputControlPin;
        /** Text that appears in the control when it has no value set */
        placeholder?: string;
        /** The control's size. `'m'` by default */
        size?: InputControlSize;
        /** The control's `tabindex` attribute */
        tabIndex?: number;
        /** The control's [type](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types) */
        type?: string;
        /** The control's value */
        value?: string;
        /** The control's view. `'normal'` by default */
        view?: InputControlView;
    };
