export const Input = ({ text, type, value, setValue }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={text}>{text}</label>
      <input
        type={type}
        name={text}
        id={text}
        placeholder={text}
        className="shadow shadow-white px-4 py-2 rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
