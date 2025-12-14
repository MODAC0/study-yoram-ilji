export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="py-20 max-w-7xl mx-auto">{children}</div>;
}
