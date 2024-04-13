export type InputFieldProps = {
  children?: React.ReactNode;
};

export default function InputField({ children }: InputFieldProps) {
  return (
    <div className="input-box my-6 relative flex flex-col">{children}</div>
  );
}
