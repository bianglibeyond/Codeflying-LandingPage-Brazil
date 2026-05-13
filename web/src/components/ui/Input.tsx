import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id, ...props },
  ref,
) {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-body-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "w-full rounded-sm border bg-white px-3 py-2.5 text-body",
          "placeholder:text-muted",
          "focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 focus:ring-offset-substrate",
          error
            ? "border-coral focus:ring-coral"
            : "border-hairline focus:border-coral",
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p className="text-caption text-muted">{hint}</p>
      )}
      {error && (
        <p className="text-caption text-coral" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

interface SelectProps
  extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, options, className, id, ...props },
  ref,
) {
  const selectId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-body-sm font-medium text-ink">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          "w-full rounded-sm border bg-white px-3 py-2.5 text-body",
          "focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 focus:ring-offset-substrate",
          error
            ? "border-coral focus:ring-coral"
            : "border-hairline focus:border-coral",
          className,
        )}
        {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
      >
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-caption text-coral" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
