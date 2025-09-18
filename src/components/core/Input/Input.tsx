export const Input = ({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="border border-gray-300 rounded-md p-2"
      onChange={onChange}
    />
  );
};
