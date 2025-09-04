
export default function PreviewSection({ children }: Props) {
  return (
    <aside className="bg-white border rounded-xl shadow flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto">
        {children}
      </div>
    </aside>
  );
}