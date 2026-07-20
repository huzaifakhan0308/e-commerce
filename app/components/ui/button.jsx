export function Button({ title, className, onClick }) {
  return (
    <button
      className={`${className} px-[40px] py-[12px] bg-[#db4444] cursor-pointer text-white rounded-[4px]`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export function ButtonGoogle({ title, className, onClick, src }) {
  return (
    <button className={className} onClick={onClick}>
      <img src={`${src}`} alt="" />
      {title}
    </button>
  );
}
