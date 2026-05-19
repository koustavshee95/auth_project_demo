import "./input.css";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  name = "",
  required = false,
  disabled = false,
  error,
}: InputProps) => {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name={name}
        required={required}
        disabled={disabled}
        className={`input-field ${error ? "input-error" : ""}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};
