export default function Button({
  children,
  type = "button",
  ariaLabel,
  onClick,
  variant = "filled",
}) {
  const variantStyle =
    variant === "outlined"
      ? "bg-white text-black border-gray-300"
      : "bg-[#4763E4] text-white border-[#4763E4]";

  return (
    <button
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      className={`flex h-12 w-fit items-center justify-center rounded-lg border-2 px-8 md:w-48 ${variantStyle}`}
    >
      {children}
    </button>
  );
}
