import type { Skill } from "./CVPreview";
import { improveSkills, sendRequest } from "../../services/aiService";
import { useState } from "react";

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs px-2 py-1 border rounded-full">
      {children}
    </span>
  );
}

export default function SkillsSection({ skills }: { skills?: Skill[] }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Habilidades</h2>

      {skills && skills.length > 0 ? (
        <>
          <ul className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <li key={`${s.nome}-${i}`}>
                <Badge>{`${s.nome} • ${s.nivel}`}</Badge>
              </li>
            ))}
          </ul>
          <button className="btn">Melhorar com IA</button>
        </>
      ) : (
        <p className="border border-dashed rounded-lg p-3 text-gray-400">
          Nenhuma habilidade adicionada ainda.
        </p>
      )}
    </section>
  );
}
