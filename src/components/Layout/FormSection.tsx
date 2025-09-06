import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function FormSection({ 
  title, 
  children, 
  }: Props) {

  return (
    <section className="bg-white border rounded-xl shadow flex flex-col overflow-hidden">
      <h2 className="font-bold text-lg px-5 pt-5 pb-3 border-b bg-white sticky top-0 z-10">
        {title}
      </h2>
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-4">
        {children}
      </div>
    </section>
  );
}