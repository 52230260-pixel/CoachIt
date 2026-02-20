import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import { mockExercises } from "../../utils/mockData";

const styles = `
  .lib-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.75rem; }
  .lib-title { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--text-1); }
  .lib-title span { color: var(--orange); }
  .lib-sub { font-size: 0.875rem; color: var(--text-3); margin-top: 0.25rem; }
  .lib-toolbar { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
  .lib-search-wrap { position: relative; flex: 1; min-width: 220px; }
  .lib-search-icon { position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%); opacity: 0.4; font-size: 0.9rem; }
  .lib-search { padding-left: 2.5rem; }
  .lib-filter { padding: 0.75rem 1rem; background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text-2); font-size: 0.85rem; font-family: var(--font-body); outline: none; cursor: pointer; appearance: none; }
  .lib-filter:focus { border-color: var(--orange); }
  .ex-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
  .ex-card { background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; transition: var(--transition); }
  .ex-card:hover { border-color: var(--border-orange); transform: translateY(-2px); }
  .ex-card-header {
    padding: 1.25rem;
    background: linear-gradient(135deg, rgba(255,107,0,0.06), transparent);
    border-bottom: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .ex-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--text-1); }
  .ex-category { font-size: 0.75rem; color: var(--orange); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 0.2rem; }
  .ex-body { padding: 1.25rem; }
  .ex-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem; }
  .ex-meta-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: var(--text-3); }
  .ex-meta-icon { opacity: 0.6; }
  .ex-link {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.6rem 0.85rem; background: rgba(255,0,0,0.07);
    border: 1px solid rgba(255,0,0,0.12); border-radius: var(--radius-sm);
    color: #FF4444; font-size: 0.8rem; font-weight: 600;
    text-decoration: none; transition: var(--transition); margin-bottom: 1rem;
    overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
  }
  .ex-link:hover { background: rgba(255,0,0,0.12); }
  .ex-actions { display: flex; gap: 0.5rem; }
  .add-modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.75);
    z-index: 500; display: flex; align-items: center; justify-content: center; padding: 1rem;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .add-modal {
    background: var(--bg-2); border: 1px solid var(--border);
    border-radius: var(--radius-xl); padding: 2rem;
    width: 100%; max-width: 500px;
    animation: slideUp 0.25s ease;
  }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .add-modal-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--text-1); margin-bottom: 1.5rem; }
  .add-modal-footer { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .del-confirm { background: rgba(255,68,68,0.05); border: 1px solid rgba(255,68,68,0.15); border-radius: var(--radius-md); padding: 1rem; font-size: 0.875rem; color: var(--text-2); margin-bottom: 1.5rem; }
  .lib-select { padding: 0.85rem 1rem; background: var(--bg-4); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text-2); font-size: 0.9rem; font-family: var(--font-body); outline: none; width: 100%; appearance: none; }
  .lib-select:focus { border-color: var(--orange); box-shadow: 0 0 0 3px rgba(255,107,0,0.12); }
`;

const CATEGORIES = ["All","Chest","Back","Legs","Shoulders","Arms","Core"];
const LEVELS = ["All","Beginner","Intermediate","Advanced"];

export default function ExerciseLibrary({ onNavigate }) {
  const [exercises, setExercises] = useState(mockExercises);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [newEx, setNewEx] = useState({ name:"", category:"Chest", muscle:"", level:"Beginner", equipment:"", videoUrl:"" });

  const filtered = exercises.filter(e => {
    const s = search.toLowerCase();
    const matchS = e.name.toLowerCase().includes(s) || e.muscle.toLowerCase().includes(s);
    const matchC = catFilter === "All" || e.category === catFilter;
    const matchL = levelFilter === "All" || e.level === levelFilter;
    return matchS && matchC && matchL;
  });

  const addExercise = () => {
    if (!newEx.name || !newEx.muscle) return;
    setExercises([...exercises, { ...newEx, id: Date.now() }]);
    setNewEx({ name:"", category:"Chest", muscle:"", level:"Beginner", equipment:"", videoUrl:"" });
    setShowAdd(false);
  };

  const deleteExercise = () => {
    setExercises(exercises.filter(e => e.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const upd = (f, v) => setNewEx(p => ({...p, [f]: v}));
  const levelColor = (l) => l === "Beginner" ? "badge-green" : l === "Intermediate" ? "badge-orange" : "badge-red";

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-layout">
        <Sidebar role="coach" activePage="exercises" onNavigate={onNavigate} userName="Coach Walid" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="lib-header">
              <div>
                <h1 className="lib-title">Exercise <span>Library</span></h1>
                <div className="lib-sub">{exercises.length} exercises in your library</div>
              </div>
              <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add Exercise</button>
            </div>

            <div className="lib-toolbar">
              <div className="lib-search-wrap">
                <span className="lib-search-icon">🔍</span>
                <input className="input-field lib-search" placeholder="Search exercises..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="lib-filter" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="lib-filter" value={levelFilter} onChange={e => setLevelFilter(e.target.value)}>
                {LEVELS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>

            <div className="ex-grid">
              {filtered.map(ex => (
                <div className="ex-card" key={ex.id}>
                  <div className="ex-card-header">
                    <div>
                      <div className="ex-name">{ex.name}</div>
                      <div className="ex-category">{ex.category}</div>
                    </div>
                    <span className={`badge ${levelColor(ex.level)}`}>{ex.level}</span>
                  </div>
                  <div className="ex-body">
                    <div className="ex-meta">
                      <div className="ex-meta-item"><span className="ex-meta-icon">💪</span>{ex.muscle}</div>
                      <div className="ex-meta-item"><span className="ex-meta-icon">🏋️</span>{ex.equipment}</div>
                    </div>
                    {ex.videoUrl && (
                      <a href={ex.videoUrl} target="_blank" rel="noreferrer" className="ex-link">
                        ▶ Watch Tutorial
                      </a>
                    )}
                    <div className="ex-actions">
                      <button className="btn-danger btn-sm" style={{flex:1}} onClick={() => setDeleteTarget(ex)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="add-modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="add-modal" onClick={e => e.stopPropagation()}>
            <h3 className="add-modal-title">Add New Exercise</h3>
            <div className="form-group">
              <label className="label">Exercise Name *</label>
              <input className="input-field" placeholder="e.g. Push-Up" value={newEx.name} onChange={e => upd("name", e.target.value)} />
            </div>
            <div className="two-col">
              <div className="form-group">
                <label className="label">Category *</label>
                <select className="lib-select" value={newEx.category} onChange={e => upd("category", e.target.value)}>
                  {["Chest","Back","Legs","Shoulders","Arms","Core"].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="label">Level *</label>
                <select className="lib-select" value={newEx.level} onChange={e => upd("level", e.target.value)}>
                  {["Beginner","Intermediate","Advanced"].map(l=><option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="label">Target Muscle *</label>
              <input className="input-field" placeholder="e.g. Pectorals" value={newEx.muscle} onChange={e => upd("muscle", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="label">Equipment</label>
              <input className="input-field" placeholder="e.g. Barbell, Dumbbell, Bodyweight" value={newEx.equipment} onChange={e => upd("equipment", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="label">YouTube Video URL</label>
              <input className="input-field" placeholder="https://www.youtube.com/watch?v=..." value={newEx.videoUrl} onChange={e => upd("videoUrl", e.target.value)} />
            </div>
            <div className="add-modal-footer">
              <button className="btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn-primary" onClick={addExercise} disabled={!newEx.name || !newEx.muscle}>Add Exercise</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="add-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="add-modal" onClick={e => e.stopPropagation()}>
            <h3 className="add-modal-title">Delete Exercise</h3>
            <div className="del-confirm">⚠️ Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This cannot be undone.</div>
            <div className="add-modal-footer">
              <button className="btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn-danger" onClick={deleteExercise}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}