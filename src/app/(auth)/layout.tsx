export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="md:h-auto md:w-full">{children}</div>
    </div>
  );
}
