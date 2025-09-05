import type { Experiencia } from "../../types/cv.types";

export default function ExperienceSection({
  experiencias,
}: {
  experiencias: Experiencia[];
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Experiência</h2>

      {experiencias.length === 0 ? (
        <p className="border border-dashed rounded-lg p-3 text-gray-400">
          Nenhuma Experiência adicionada ainda.
        </p>
      ) : (
        <ul className="space-y-4">
          {experiencias.map((exp, i) => (
            <li key={i} className="border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-bold">
                  {exp.cargo} <span className="font-normal">— {exp.empresa}</span>
                </h3>
                <span className="text-sm text-gray-600">{exp.periodo}</span>
              </div>
              <div className="text-sm text-gray-600">{exp.local}</div>
              <p className="mt-2 text-gray-800 leading-relaxed">{exp.descricao}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
