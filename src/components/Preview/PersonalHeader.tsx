type Props = {
  nome?: string;
  email?: string;
  telefone?: string;
  linkedin?: string;
  resumo?: string;
};

function Empty({ children }: { children: string }) {
  return <span className="text-gray-400 italic">{children}</span>;
}

export default function PersonalHeader({
  nome,
  email,
  telefone,
  linkedin,
  resumo,
}: Props) {
  const hasContacts = email || telefone || linkedin;

  return (
    <header className="border-b pb-6">
      <h1 className="text-2xl font-extrabold tracking-tight">
        {nome?.trim() ? nome : <Empty>Seu nome</Empty>}
      </h1>

      <div className="mt-2 text-sm text-gray-700 flex flex-wrap gap-x-4 gap-y-1">
        {hasContacts ? (
          <>
            {email && <span>📧 {email}</span>}
            {telefone && <span>☎️ {telefone}</span>}
            {linkedin && <span>💼 {linkedin}</span>}
          </>
        ) : (
          <Empty>Adicione email / telefone / LinkedIn</Empty>
        )}
      </div>

      <div className="mt-4">
        {resumo?.trim() ? (
          <p className="text-gray-800 leading-relaxed">{resumo}</p>
        ) : (
          <div className="border border-dashed rounded-lg p-3 text-gray-400">
            <em>Resumo profissional aparecerá aqui…</em>
          </div>
        )}
      </div>
    </header>
  );
}
