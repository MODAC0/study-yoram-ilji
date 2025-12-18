export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="py-20 mx-auto">{children}</div>;
}
