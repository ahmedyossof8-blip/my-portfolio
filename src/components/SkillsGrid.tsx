import React from 'react';
import { Cpu, Server, Database, Code, Layers, Move } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  shapeClass: string;
  config: string;
  description: string;
}

export const SkillsGrid: React.FC = () => {
  const skills: SkillNode[] = [
    {
      id: 'python',
      name: 'Python',
      category: 'Core Language',
      icon: Code,
      color: 'from-amber-400/20 to-blue-500/20',
      borderColor: 'border-amber-400/40',
      shapeClass: 'rounded-3xl',
      config: '{"floating": true, "blurAmount": 0.5, "refraction": 1.5, "chromAberration": 1.2, "zRadius": 30, "floating": true}',
      description: 'Async engines, data structures & high-performance computing.',
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      category: 'Backend Framework',
      icon: Server,
      color: 'from-emerald-400/20 to-teal-600/20',
      borderColor: 'border-emerald-400/40',
      shapeClass: 'rounded-full',
      config: '{"floating": true, "blurAmount": 0.6, "refraction": 1.8, "chromAberration": 1.4, "bevelMode": 1, "zRadius": 40, "floating": true}',
      description: 'High-performance microservices, Pydantic validation & OpenAPI.',
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Runtime Environment',
      icon: Cpu,
      color: 'from-green-500/20 to-emerald-700/20',
      borderColor: 'border-green-400/40',
      shapeClass: 'rounded-2xl rotate-1',
      config: '{"floating": true, "blurAmount": 0.55, "refraction": 1.6, "chromAberration": 1.1, "zRadius": 25, "floating": true}',
      description: 'Event-driven I/O, REST APIs & scalable server architectures.',
    },
    {
      id: 'react',
      name: 'React',
      category: 'Frontend Library',
      icon: Layers,
      color: 'from-cyan-400/20 to-blue-600/20',
      borderColor: 'border-cyan-400/40',
      shapeClass: 'rounded-3xl -rotate-1',
      config: '{"floating": true, "blurAmount": 0.5, "refraction": 1.7, "chromAberration": 1.3, "zRadius": 35, "floating": true}',
      description: 'Component architecture, state management & reactive UIs.',
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'Database System',
      icon: Database,
      color: 'from-blue-500/20 to-indigo-600/20',
      borderColor: 'border-indigo-400/40',
      shapeClass: 'rounded-[2.5rem]',
      config: '{"floating": true, "blurAmount": 0.6, "refraction": 1.4, "chromAberration": 1.0, "zRadius": 20, "floating": true}',
      description: 'Relational data modeling, query optimization & ACID transactions.',
    },
  ];

  return (
    <section id="skills" className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <Move className="w-3.5 h-3.5 text-purple-400" />
            <span>INTERACTIVE MULTI-PASS REFRACTION NODES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Technical Arsenal
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Drag any two nodes to overlap them! The liquid-glass multi-pass rendering engine computes stacked glass distortions, real-time light bending, and dynamic chromatic aberration.
          </p>
        </div>

        {/* Liquid Glass Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {skills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.id}
                className={`liquid-glass-element glass-panel ${skill.shapeClass} p-7 relative border ${skill.borderColor} transition-all duration-300 chromatic-node group cursor-grab active:cursor-grabbing hover:scale-[1.02] shadow-xl`}
                data-config={skill.config}
              >
                {/* Node Drag Handle */}
                <div className="absolute top-3 right-3 text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <Move className="w-4 h-4" />
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${skill.color} border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-cyan-300" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400/90 tracking-wider uppercase block">
                      {skill.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                      {skill.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {skill.description}
                </p>

                {/* Overlap Distortion Visual Indicator */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="group-hover:text-purple-300 transition-colors">CHROMATIC SHIFT: READY</span>
                  <span className="text-cyan-400/80">OVERLAP FOR DISTORTION</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
