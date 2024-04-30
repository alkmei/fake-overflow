export default function FormError({ message }: { message: string }) {
  return (
    <>
      <p className="text-sm text-red-500">{message}</p>
    </>
  );
}
