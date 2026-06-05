"use client";

import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { GripVertical, Image as ImageIcon, Save, CheckCircle2, ArrowLeft, Edit, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { Project } from "@/components/portfolio/ProjectCard";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("spylt_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    fetchProjects();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "jaimetarazona" && (password === "Tarazona1309" || password === "Tarazona1309.")) {
      setIsAuthenticated(true);
      localStorage.setItem("spylt_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Usuario o contrase\u00f1a incorrectos.");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveToBackend = async (newProjects: Project[]) => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProjects),
      });
      if (res.ok) {
        setMessage("Guardado correctamente.");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, projectId: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(projectId);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        const newProjects = projects.map(p => 
          p.id === projectId ? { ...p, image: data.imageUrl } : p
        );
        setProjects(newProjects);
        await saveToBackend(newProjects);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingId(null);
    }
  };

  const handleAddNew = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setEditingProject({
      id: newId,
      title: "",
      description: "",
      image: "",
      category: "Webs",
      technologies: [],
      url: "",
      allowIframe: true
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("\u00bfEst\u00e1s seguro de que quieres eliminar este proyecto?")) {
      const newProjects = projects.filter(p => p.id !== id);
      setProjects(newProjects);
      saveToBackend(newProjects);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let newProjects = [...projects];
    const exists = newProjects.find(p => p.id === editingProject.id);
    
    if (exists) {
      newProjects = newProjects.map(p => p.id === editingProject.id ? editingProject : p);
    } else {
      newProjects = [editingProject, ...newProjects];
    }

    setProjects(newProjects);
    saveToBackend(newProjects);
    setEditingProject(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2 text-center">Acceso Privado</h1>
            <p className="text-gray-400 text-center mb-8">Ingresa tus credenciales para administrar el portfolio.</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Usuario</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="ej. jaimetarazona"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Contrase\u00f1a</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  required
                />
              </div>
              
              {loginError && (
                <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">{loginError}</p>
              )}

              <button 
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 py-3 rounded-full font-bold transition-all mt-4"
              >
                Ingresar al Panel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Cargando proyectos...</div>;

  return (
    <div className="min-h-screen bg-background text-foreground p-8 pb-32">
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Volver al Portfolio
            </Link>
            <h1 className="font-heading text-4xl font-bold text-white">Panel de Administraci\u00f3n</h1>
            <p className="text-gray-400 mt-2">Gestiona todos tus proyectos. Puedes editarlos, reordenarlos o crear nuevos.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 bg-zinc-800 text-white hover:bg-zinc-700 px-6 py-3 rounded-full font-bold transition-all border border-white/10"
            >
              <Plus className="w-5 h-5" />
              Nuevo
            </button>
            <button
              onClick={() => saveToBackend(projects)}
              disabled={saving}
              className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full font-bold transition-all disabled:opacity-50"
            >
              {saving ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
              Guardar Orden
            </button>
          </div>
        </div>

        {message && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            {message}
          </div>
        )}

        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <Reorder.Group axis="y" values={projects} onReorder={setProjects} className="space-y-4">
            {projects.map((project) => (
              <Reorder.Item 
                key={project.id} 
                value={project}
                className="bg-zinc-800/50 border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-4 cursor-grab active:cursor-grabbing hover:bg-zinc-800 transition-colors relative"
              >
                <div className="text-gray-500 p-2 hidden md:block">
                  <GripVertical className="w-6 h-6" />
                </div>
                
                <div className="w-full md:w-32 h-32 md:h-20 bg-zinc-900 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative group">
                  {project.image ? (
                     <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  {uploadingId === project.id && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{project.title}</h3>
                  <p className="text-sm text-gray-400">{project.category}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, project.id)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      title="Actualizar portada"
                    />
                    <button className="flex w-full justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                      <ImageIcon className="w-4 h-4" />
                      Portada
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => setEditingProject(project)}
                    className="flex justify-center items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border border-blue-500/30"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>

                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="flex justify-center items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border border-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>

      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-2xl p-6 md:p-8 relative">
            <button 
              onClick={() => setEditingProject(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="font-heading text-2xl font-bold text-white mb-6">
              {projects.find(p => p.id === editingProject.id) ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </h2>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">T\u00edtulo</label>
                <input 
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Descripci\u00f3n</label>
                <textarea 
                  required
                  rows={3}
                  value={editingProject.description}
                  onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Categor\u00eda</label>
                  <select 
                    required
                    value={editingProject.category}
                    onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Selecciona una categor\u00eda</option>
                    {[
                      "Webs", "Sistemas Web", "Software a Medida", "Ecommerce", 
                      "Inteligencia Artificial", "Landing Pages", 
                      "Dashboards", "Apps", "UX/UI", "APIs"
                    ].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">URL / Link Web</label>
                  <input 
                    type="url"
                    required
                    value={editingProject.url}
                    onChange={e => setEditingProject({...editingProject, url: e.target.value})}
                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Tecnolog\u00edas / Etiquetas
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React", "Next.js", "Tailwind CSS", "Node.js", "TypeScript", 
                    "JavaScript", "Python", "PHP", "WordPress", "Firebase", 
                    "MongoDB", "PostgreSQL", "MySQL", "Figma", "GSAP", 
                    "Framer Motion", "Stripe", "OpenAI", "AWS", "Vercel", "HTML5", "CSS3"
                  ].map(tech => {
                    const isSelected = editingProject.technologies.includes(tech);
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setEditingProject({
                              ...editingProject, 
                              technologies: editingProject.technologies.filter(t => t !== tech)
                            });
                          } else {
                            setEditingProject({
                              ...editingProject, 
                              technologies: [...editingProject.technologies, tech]
                            });
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                          isSelected 
                            ? "bg-accent/20 border-accent/50 text-white" 
                            : "bg-zinc-800/50 border-white/10 text-gray-400 hover:bg-zinc-700 hover:text-white"
                        }`}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">\u00bfFalta una tecnolog\u00eda? A\u00f1\u00e1dela separada por comas:</label>
                  <input 
                    type="text"
                    placeholder="Ej. React Native, Supabase..."
                    value={editingProject.technologies.filter(t => ![
                      "React", "Next.js", "Tailwind CSS", "Node.js", "TypeScript", 
                      "JavaScript", "Python", "PHP", "WordPress", "Firebase", 
                      "MongoDB", "PostgreSQL", "MySQL", "Figma", "GSAP", 
                      "Framer Motion", "Stripe", "OpenAI", "AWS", "Vercel", "HTML5", "CSS3"
                    ].includes(t)).join(", ")}
                    onChange={e => {
                      const baseTechs = editingProject.technologies.filter(t => [
                        "React", "Next.js", "Tailwind CSS", "Node.js", "TypeScript", 
                        "JavaScript", "Python", "PHP", "WordPress", "Firebase", 
                        "MongoDB", "PostgreSQL", "MySQL", "Figma", "GSAP", 
                        "Framer Motion", "Stripe", "OpenAI", "AWS", "Vercel", "HTML5", "CSS3"
                      ].includes(t));
                      const customTechs = e.target.value.split(",").map(t => t.trim()).filter(t => t !== "");
                      setEditingProject({...editingProject, technologies: [...baseTechs, ...customTechs]});
                    }}
                    className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-800/50 p-4 rounded-xl border border-white/5">
                <input 
                  type="checkbox"
                  id="allowIframe"
                  checked={editingProject.allowIframe !== false}
                  onChange={e => setEditingProject({...editingProject, allowIframe: e.target.checked})}
                  className="w-5 h-5 accent-accent"
                />
                <label htmlFor="allowIframe" className="text-sm text-gray-300 cursor-pointer">
                  <strong className="block text-white">Abrir en Ventana Integrada (Iframe)</strong>
                  Desactiva esto si la web proh\u00edbe incrustaci\u00f3n. Se abrir\u00e1 en una nueva pesta\u00f1a.
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-white/10">
                <button 
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-6 py-2.5 rounded-full font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-full font-bold transition-all"
                >
                  Guardar Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
