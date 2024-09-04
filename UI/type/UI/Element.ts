import type { InputHTMLAttributes } from 'vue';

import type { IconName } from '../Icon/name';
import type { InputMode } from '../CSS/index';


export interface FormElementsBaseParams {
    // стили оформления input
    mode?: 'primary' | 'secondary' | 'outline' | 'none';
    name?: string;
    autocomplete?: string;
    placeholder?: string | number;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
}

export interface InputProps extends FormElementsBaseParams {
    type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel';
    span?: string;
    modelValue?: number | string;
    mode: InputMode;
    valid?: 'invalid' | 'valid';
    icon?: { icon?: IconName, size?: `${number}_${number}`, type?: 'outline' | 'monocolor' };
    iconClickable?: boolean;
    inputAttr?: InputHTMLAttributes;
}
