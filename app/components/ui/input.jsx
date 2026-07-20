export function Input({ placeholder, type, className, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-[#f5f5f5] px-4 py-2 outline-none border-0 rounded-md ${className}`}
      value={value}
      onChange={onChange}
    />
  );
}

export function TextArea({ placeholder, type, className, value, onChange }) {
  return (
    <textarea
      type={type}
      placeholder={placeholder}
      className={`bg-[#f5f5f5] px-4 py-2 outline-none border-0 rounded-md ${className}`}
      value={value}
      onChange={onChange}
    />
  );
}
