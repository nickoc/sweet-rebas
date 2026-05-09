import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "default" | "rounded";

const VARIANTS: Record<Variant, string> = {
  default: "rounded-lg",
  rounded: "rounded-full",
};

// text-base (16px) is mandatory — iOS Safari auto-zooms on input focus when font-size < 16px.
// min-h-12 satisfies Apple HIG 44pt + Material 48dp.
const BASE =
  "w-full bg-white border border-reba-border px-5 py-3 min-h-12 text-base text-reba-ink placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition-colors disabled:opacity-60";

type InputProps = {
  variant?: Variant;
  className?: string;
  label?: string;
  hint?: string;
  errorText?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export function Input({
  variant = "default",
  className = "",
  label,
  hint,
  errorText,
  id,
  ...rest
}: InputProps) {
  const inputId = id ?? `input-${rest.name ?? Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={inputId}>{label}</Label>
      )}
      <input
        id={inputId}
        {...rest}
        className={`${BASE} ${VARIANTS[variant]} ${className}`}
      />
      {hint && !errorText && (
        <p className="mt-1 text-xs text-reba-muted">{hint}</p>
      )}
      {errorText && (
        <p className="mt-1 text-xs text-reba-pink">{errorText}</p>
      )}
    </div>
  );
}

type TextareaProps = {
  variant?: Variant;
  className?: string;
  label?: string;
  hint?: string;
  errorText?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;

export function Textarea({
  variant = "default",
  className = "",
  label,
  hint,
  errorText,
  id,
  rows = 3,
  ...rest
}: TextareaProps) {
  const inputId = id ?? `textarea-${rest.name ?? Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={inputId}>{label}</Label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        {...rest}
        className={`${BASE} ${VARIANTS[variant]} resize-none ${className}`}
      />
      {hint && !errorText && (
        <p className="mt-1 text-xs text-reba-muted">{hint}</p>
      )}
      {errorText && (
        <p className="mt-1 text-xs text-reba-pink">{errorText}</p>
      )}
    </div>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[10px] uppercase tracking-wider text-reba-muted font-bold mb-1"
    >
      {children}
    </label>
  );
}
