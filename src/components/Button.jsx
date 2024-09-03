/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import Loader from "./Loader";
import clsx from "clsx";

export const Button = ({
  loading = false,
  block = false,
  className,
  disabled,
  icon,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={clsx([
        "leading-6 flex items-center justify-center relative overflow-hidden bg-os-purple rounded-[10px] text-white px-5 py-3 font-light capitalize",
        icon && "px-5",
        disabled && "disabled:cursor-not-allowed",
        className,
      ])}
      type={props?.type ?? "button"}
      {...props}
    >
      {loading && (
        <span className="bg-black/10 absolute inset-0 flex items-center justify-center">
          <Loader />
        </span>
      )}
      {icon && (
        <span className={`mr-2 h-4 w-4 flex items-center justify-center`}>
          {typeof icon === "string" ? (
            <img
              src={`/icons/${icon}.svg`}
              className="object-contain w-full h-full"
              alt={icon}
            />
          ) : (
            icon
          )}
        </span>
      )}
      {props.children}
    </button>
  );
};
