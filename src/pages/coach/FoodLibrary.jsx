import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import { mockFoods } from "../../utils/mockData";

const styles = `
  .food-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
  .food-card { background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; transition: var(--transition); }
  .food-card:hover { border-color: var(--border-orange); transform: translateY(-2px); }
  .food-card-header { padding: 1.1rem 1.25rem; background: linear-gradient(135deg, rgba(255,107,0,0.05), transparent); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .food-name { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--text-1); }
  .food-unit { font-size: 0.72rem; color: var(--text-4); margin-top: 0.15rem; }
  .food-body { padding: 1.1rem 1.25rem; }
  .food-macros { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 1rem; }
  .macro-box { background: var(--bg-4); border-radius: var(--radius-sm); padding: 0.5rem; text-align: center; }
  .macro-val { font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: var(--orange); }
  .macro-label { font-size: 0.6rem; color: var(--text-4); text-transform: uppercase; letter-spacing: 0.3px; }
  .food-cal { background: rgba(255,107,0,0.07); border: 1px solid var(--border-orange); border-radius: var(--radius-sm); padding: 0.4rem 0.75rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
  .food-cal-label { font-size: 0.75rem; color: var(--text-3); }
  .food-cal-val { font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: var(--orange); }
  .lib-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.75rem; }
  .lib-title { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--text-1); }
  .lib-title span { color: var(--orange); }
  .lib-sub { font-size: 0.875rem; color: var(--text-3); margin-top: 0.25rem; }
  .lib-toolbar { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
  .lib-search-wrap { position: relative; flex: 1; min-width: 220px; }
  .lib-search-icon { position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%); opacity: 0.4; }
  .lib-search { padding-left: 2.5rem; }
  .lib-filter { padding: 0.75rem 1rem; background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text-2); font-size: 0.85rem; font-family: var(--font-body); outline: none; cursor: pointer; appearance: none; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 500; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  .modal-box { background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 2rem; width: 100%; max-width: 480px; animation: slideUp 0.25s ease; }
  @keyframes slideUp { from { transform: translateY(20px); opacity:0 } to { transform: translateY(0); opacity:1 } }
  .modal-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--text-1); margin-bottom: 1.5rem; }
  .modal-footer { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .four-col { display: grid; grid-template-columns: repeat(4,1fr); gap: 0.5rem; }
  .lib-select { padding: 0.85rem 1rem; background: var(--bg-4); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text-2); font-size: 0.9rem; font-family: var(--font-body); outline: none; width: 100%; }
  .lib-select:focus { border-color: var(--orange); }
  .del-confirm { background: rgba(255,68,68,0.05); border: 1px solid rgba(255,68,68,0.15); border-radius: var(--radius-md); padding: 1rem; font-size: 0.875rem; color: var(--text-2); margin-bottom: 1.5rem; }
  .cat-protein { color: #3B82F6; }
  .cat-carbs { color: #F59E0B; }
  .cat-fats { color: #10B981; }
  .cat-dairy { color: #8B5CF6; }
  .cat-fruits { color: #EC4899; }
`;

const CATEGORIES = ["All","Protein","Carbs","Fats","Dairy","Fruits"];
const catColors = { Protein:"badge-blue", Carbs:"badge-orange", Fats:"badge-green", Dairy:"badge-gray", Fruits:"badge-red" };

export default function FoodLibrary({ onNavigate }) {
  const [foods, setFoods] = useState(mockFoods);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [newFood, setNewFood] = useState({ name:"", category:"Protein", calories:"", protein:"", carbs:"", fat:"", unit:"100g" });

  const filtered = foods.filter(f => {
    const matchS = f.name.toLowerCase().includes(search.toLowerCase());
    const matchC = catFilter === "All" || f.category === catFilter;
    return matchS && matchC;
  });

  const upd = (field, val) => setNewFood(p => ({...p, [field]: val}));

  const addFood = () => {
    if (!newFood.name || !newFood.calories) return;
    setFoods([...foods, { ...newFood, id: Date.now(), calories: +newFood.calories, protein: +newFood.protein, carbs: +newFood.carbs, fat: +newFood.fat }]);
    setNewFood({ name:"", category:"Protein", calories:"", protein:"", carbs:"", fat:"", unit:"100g" });
    setShowAdd(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-layout">
        <Sidebar role="coach" activePage="foods" onNavigate={onNavigate} userName="Coach Walid" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="lib-header">
              <div>
                <h1 className="lib-title">Food <span>Library</span></h1>
                <div className="lib-sub">{foods.length} foods in your library</div>
              </div>
              <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add Food</button>
            </div>

            <div className="lib-toolbar">
              <div className="lib-search-wrap">
                <span className="lib-search-icon">🔍</span>
                <input className="input-field lib-search" placeholder="Search foods..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="lib-filter" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="food-grid">
              {filtered.map(food => (
                <div className="food-card" key={food.id}>
                  <div className="food-card-header">
                    <div>
                      <div className="food-name">{food.name}</div>
                      <div className="food-unit">per {food.unit}</div>
                    </div>
                    <span className={`badge ${catColors[food.category] || "badge-gray"}`}>{food.category}</span>
                  </div>
                  <div className="food-body">
                    <div className="food-cal">
                      <span className="food-cal-label">🔥 Calories</span>
                      <span className="food-cal-val">{food.calories} kcal</span>
                    </div>
                    <div className="food-macros">
                      <div className="macro-box">
                        <div className="macro-val">{food.protein}g</div>
                        <div className="macro-label">Protein</div>
                      </div>
                      <div className="macro-box">
                        <div className="macro-val">{food.carbs}g</div>
                        <div className="macro-label">Carbs</div>
                      </div>
                      <div className="macro-box">
                        <div className="macro-val">{food.fat}g</div>
                        <div className="macro-label">Fat</div>
                      </div>
                      <div className="macro-box">
                        <div className="macro-val" style={{fontSize:"0.85rem"}}>{Math.round(food.protein*4 / food.calories * 100)}%</div>
                        <div className="macro-label">P ratio</div>
                      </div>
                    </div>
                    <button className="btn-danger btn-sm" style={{width:"100%"}} onClick={() => setDeleteTarget(food)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Add New Food</h3>
            <div className="form-group">
              <label className="label">Food Name *</label>
              <input className="input-field" placeholder="e.g. Chicken Breast" value={newFood.name} onChange={e => upd("name", e.target.value)} />
            </div>
            <div className="two-col">
              <div className="form-group">
                <label className="label">Category</label>
                <select className="lib-select" value={newFood.category} onChange={e => upd("category", e.target.value)}>
                  {["Protein","Carbs","Fats","Dairy","Fruits","Vegetables"].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="label">Serving Unit</label>
                <input className="input-field" placeholder="100g / 1 cup / 1 egg" value={newFood.unit} onChange={e => upd("unit", e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="label">Calories (kcal) *</label>
              <input type="number" className="input-field" placeholder="0" value={newFood.calories} onChange={e => upd("calories", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="label">Macros (grams)</label>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.5rem"}}>
                <input type="number" className="input-field" placeholder="Protein" value={newFood.protein} onChange={e => upd("protein", e.target.value)} />
                <input type="number" className="input-field" placeholder="Carbs" value={newFood.carbs} onChange={e => upd("carbs", e.target.value)} />
                <input type="number" className="input-field" placeholder="Fat" value={newFood.fat} onChange={e => upd("fat", e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn-primary" onClick={addFood} disabled={!newFood.name || !newFood.calories}>Add Food</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Delete Food</h3>
            <div className="del-confirm">⚠️ Are you sure you want to delete <strong>{deleteTarget.name}</strong>?</div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => { setFoods(foods.filter(f => f.id !== deleteTarget.id)); setDeleteTarget(null); }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}