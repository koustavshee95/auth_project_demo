import "./Button.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
}

export const Button = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  variant = "primary",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} ${loading ? "btn-loading" : ""}`}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};
