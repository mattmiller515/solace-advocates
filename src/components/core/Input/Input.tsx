export const Input = ({
  id,
  value,
  onChange,
}: {
  id?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      id={id}
      className="border border-gray-300 rounded-md p-2"
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
};
