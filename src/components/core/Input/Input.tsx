export const Input = ({
  id,
  onChange,
}: {
  id?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      id={id}
      className="border border-gray-300 rounded-md p-2"
      onChange={onChange}
      autoComplete="off"
    />
  );
};
