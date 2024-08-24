import type { InputHTMLAttributes } from 'vue';

import type { IconName } from '@/type/index';

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
    valid?: 'invalid' | 'valid';
    icon?: IconName;
    iconClickable?: boolean;
    inputAttr?: InputHTMLAttributes;
}
