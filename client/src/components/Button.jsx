import clsx from "clsx";

const Button = ({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}) => {
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 text-white",
    secondary:
      "bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-md shadow-pink-400/30 hover:shadow-lg hover:shadow-pink-400/40 text-white",
    tertiary:
      "bg-white border-2 border-gray-300 hover:border-indigo-500 text-gray-700 hover:text-indigo-600 font-semibold hover:bg-white shadow-md hover:shadow-lg",
  };

  return (
    <button
      type={type}
      className={clsx(
        "px-4 py-3 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
