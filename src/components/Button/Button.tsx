import React from 'react';
import './button.scss';

export interface ButtonProps {
  cancelBtn?: boolean;
  disabled?: boolean;
  animDisabled?: boolean;
  arrow?: boolean;
  arrowLeft?: boolean;
  backgroundColor?: string;
  widthFull?: boolean;
  size?: 'micro' | 'small' | 'medium' | 'large';
  children?: string;
  onClick?: () => void;
}

export const Button = ({
  cancelBtn = false,
  disabled = false,
  animDisabled = false,
  arrow = false,
  arrowLeft = false,
  widthFull = false,
  size = 'medium',
  backgroundColor,
  children="Button",
  ...props
}: ButtonProps) => {
  const arrowAnimation = arrowLeft ? 'sneakers-button--left' : 'sneakers-button--right';
  const width = widthFull ? 'sneakers-button--full-width' : '';
  const animation =  animDisabled ? 'sneakers-button--anim-disabled' : '';
  const cancel = cancelBtn ? 'sneakers-button--cancel-order' : '';

  return (
    <button
      type="button"
      className={['sneakers-button', `sneakers-button--${size}`, animation, width, arrowAnimation, cancel].join(' ')}
      style={{ backgroundColor }}
      disabled={disabled}
      {...props}
    >
      {children}
      {
        arrow ? (
          arrowLeft
            ? <img src="img/return_arrow.svg" alt="Arrow" />
            : <img src="img/checkout_arrow.svg" alt="Arrow" />
        ) : ''
      }
    </button>
  );
};
