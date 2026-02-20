import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import { mockClients, mockExercises, mockFoods } from "../../utils/mockData";

const styles = `
  .mc-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.75rem; }
  .mc-title { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--text-1); }
  .mc-title span { color: var(--orange); }
  .mc-sub { font-size: 0.875rem; color: var(--text-3); margin-top: 0.25rem; }
  .mc-client-selector { background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem; }
  .mc-selector-label { font-size: 0.7rem; font-weight: 700; color: var(--text-4); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.75rem; }
  .mc-clients-list { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .mc-client-chip {
    display: flex; align-items: center; gap: 0.6rem;
    padding: 0.5rem 1rem; border: 1px solid var(--border);
    border-radius: 100px; cursor: pointer; transition: var(--transition);
    background: var(--bg-4); font-size: 0.85rem; color: var(--text-2);
  }
  .mc-client-chip:hover { border-color: var(--border-orange); color: var(--orange); }
  .mc-client-chip.selected { border-color: var(--orange); background: rgba(255,107,0,0.08); color: var(--orange); }
  .mc-chip-avatar { width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, var(--orange), var(--orange-light)); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: #fff; }
  .mc-plan-tabs { display: flex; gap: 0.25rem; background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 0.3rem; width: fit-content; margin-bottom: 1.5rem; }
  .mc-plan-tab { padding: 0.5rem 1.5rem; border-radius: calc(var(--radius-md) - 4px); font-size: 0.875rem; font-weight: 600; color: var(--text-3); cursor: pointer; background: none; border: none; transition: var(--transition); }
  .mc-plan-tab.active { background: var(--orange); color: #fff; }
  .mc-plan-card { background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .mc-plan-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .mc-plan-title { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--text-1); }
  .mc-plan-body { padding: 1.5rem; }
  .mc-dates { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.5rem; }
  .mc-day-block { background: var(--bg-4); border: 1px solid var(--border); border-radius: var(--radius-md); margin-bottom: 1rem; overflow: hidden; }
  .mc-day-header { padding: 0.85rem 1.25rem; background: rgba(255,107,0,0.05); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
  .mc-day-label { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--text-1); }
  .mc-day-focus { font-size: 0.78rem; color: var(--orange); font-weight: 600; }
  .mc-day-body { padding: 1.25rem; }
  .mc-exercise-row { background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.85rem 1rem; margin-bottom: 0.75rem; }
  .mc-exercise-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
  .mc-exercise-name { font-size: 0.875rem; font-weight: 600; color: var(--text-1); }
  .mc-ex-inputs { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 0.5rem; }
  .mc-ex-input-wrap { display: flex; flex-direction: column; gap: 0.3rem; }
  .mc-ex-input-label { font-size: 0.62rem; font-weight: 700; color: var(--text-4); text-transform: uppercase; letter-spacing: 0.5px; }
  .mc-ex-input { padding: 0.5rem 0.6rem; background: var(--bg-4); border: 1px solid var(--border); border-radius: 6px; color: var(--text-1); font-size: 0.8rem; font-family: var(--font-body); outline: none; }
  .mc-ex-input:focus { border-color: var(--orange); }
  .mc-add-ex-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1rem; background: rgba(255,107,0,0.06); border: 1px dashed var(--border-orange); border-radius: var(--radius-sm); color: var(--orange); font-size: 0.8rem; font-weight: 600; cursor: pointer; width: 100%; justify-content: center; transition: var(--transition); }
  .mc-add-ex-btn:hover { background: rgba(255,107,0,0.1); }
  .mc-meal-block { background: var(--bg-4); border: 1px solid var(--border); border-radius: var(--radius-md); margin-bottom: 1rem; overflow: hidden; }
  .mc-meal-header { padding: 0.85rem 1.25rem; background: rgba(255,107,0,0.04); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .mc-meal-label { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--text-1); }
  .mc-meal-time { font-size: 0.78rem; color: var(--text-4); }
  .mc-meal-body { padding: 1rem; }
  .mc-food-row { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; }
  .mc-food-name { flex: 1; font-size: 0.85rem; color: var(--text-2); }
  .mc-food-amount { width: 100px; padding: 0.4rem 0.6rem; background: var(--bg-3); border: 1px solid var(--border); border-radius: 6px; color: var(--text-1); font-size: 0.8rem; font-family: var(--font-body); outline: none; }
  .mc-food-amount:focus { border-color: var(--orange); }
  .mc-save-bar { background: var(--bg-0); border-top: 1px solid var(--border-orange); padding: 1.25rem 2rem; display: flex; justify-content: flex-end; gap: 1rem; align-items: center; }
  .mc-save-msg { font-size: 0.875rem; color: #22C55E; font-weight: 600; }
  .mc-no-client { padding: 4rem 2rem; text-align: center; color: var(--text-3); }
  .mc-no-client span { font-size: 3rem; display: block; margin-bottom: 1rem; opacity: 0.4; }
  .add-ex-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 500; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); }
  .add-ex-modal { background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 2rem; width: 100%; max-width: 500px; max-height: 80vh; overflow-y: auto; }
  .add-ex-modal-title { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: var(--text-1); margin-bottom: 1rem; }
  .ex-pick-list { display: flex; flex-direction: column; gap: 0.5rem; max-height: 300px; overflow-y: auto; }
  .ex-pick-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-3); border: 1px solid var(--border); border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition); }
  .ex-pick-item:hover { border-color: var(--border-orange); }
  .ex-pick-name { font-size: 0.875rem; font-weight: 600; color: var(--text-1); }
  .ex-pick-meta { font-size: 0.75rem; color: var(--text-3); }
  @media (max-width: 768px) {
    .mc-ex-inputs { grid-template-columns: 1fr 1fr; }
    .mc-dates { grid-template-columns: 1fr; }
  }
`;

const WORKOUT_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = [
  { meal: "Breakfast", time: "7:00 AM" },
  { meal: "Snack", time: "10:00 AM" },
  { meal: "Lunch", time: "1:00 PM" },
  { meal: "Snack", time: "4:00 PM" },
  { meal: "Dinner", time: "8:00 PM" },
];

function initWorkout() {
  return WORKOUT_DAYS.slice(0, 3).map(day => ({ day, focus: "", exercises: [], expanded: true }));
}

function initDiet() {
  return MEALS.map(m => ({...m, foods: []}));
}

export default function ManageClient({ onNavigate }) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [tab, setTab] = useState("workout");
  const [workoutDays, setWorkoutDays] = useState(initWorkout());
  const [dietMeals, setDietMeals] = useState(initDiet());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saved, setSaved] = useState(false);
  const [addExModal, setAddExModal] = useState(null); // dayIndex

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Workout helpers
  const toggleDay = (i) => setWorkoutDays(d => d.map((day, idx) => idx === i ? {...day, expanded: !day.expanded} : day));
  const updateFocus = (i, val) => setWorkoutDays(d => d.map((day, idx) => idx === i ? {...day, focus: val} : day));
  const addExToDay = (dayIdx, exercise) => {
    setWorkoutDays(d => d.map((day, i) => i === dayIdx ? {
      ...day,
      exercises: [...day.exercises, { name: exercise.name, sets: "4", reps: "8-12", rest: "60s", videoUrl: exercise.videoUrl || "" }]
    } : day));
    setAddExModal(null);
  };
  const updateEx = (dayIdx, exIdx, field, val) => {
    setWorkoutDays(d => d.map((day, i) => i === dayIdx ? {
      ...day,
      exercises: day.exercises.map((ex, j) => j === exIdx ? {...ex, [field]: val} : ex)
    } : day));
  };
  const removeEx = (dayIdx, exIdx) => {
    setWorkoutDays(d => d.map((day, i) => i === dayIdx ? { ...day, exercises: day.exercises.filter((_,j) => j !== exIdx) } : day));
  };
  const addDay = () => {
    const used = workoutDays.map(d => d.day);
    const next = WORKOUT_DAYS.find(d => !used.includes(d));
    if (next) setWorkoutDays([...workoutDays, { day: next, focus: "", exercises: [], expanded: true }]);
  };
  const removeDay = (i) => setWorkoutDays(workoutDays.filter((_,idx) => idx !== i));

  // Diet helpers
  const addFoodToMeal = (mealIdx, food) => {
    setDietMeals(m => m.map((meal, i) => i === mealIdx ? {
      ...meal, foods: [...meal.foods, { name: food.name, amount: "", calories: food.calories, unit: food.unit }]
    } : meal));
  };
  const removeFoodFromMeal = (mealIdx, fIdx) => {
    setDietMeals(m => m.map((meal, i) => i === mealIdx ? { ...meal, foods: meal.foods.filter((_,j) => j !== fIdx) } : meal));
  };
  const updateFoodAmount = (mealIdx, fIdx, val) => {
    setDietMeals(m => m.map((meal, i) => i === mealIdx ? {
      ...meal, foods: meal.foods.map((f, j) => j === fIdx ? {...f, amount: val} : f)
    } : meal));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-layout">
        <Sidebar role="coach" activePage="clients" onNavigate={onNavigate} userName="Coach Walid" />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="mc-header">
              <div>
                <h1 className="mc-title">Manage <span>Client Plan</span></h1>
                <div className="mc-sub">Assign custom workout & diet plans with schedules</div>
              </div>
            </div>

            {/* Client Selector */}
            <div className="mc-client-selector">
              <div className="mc-selector-label">Select Client</div>
              <div className="mc-clients-list">
                {mockClients.map(c => (
                  <div key={c.id} className={`mc-client-chip ${selectedClient?.id === c.id ? "selected" : ""}`} onClick={() => setSelectedClient(c)}>
                    <div className="mc-chip-avatar">{c.name.charAt(0)}</div>
                    {c.name}
                  </div>
                ))}
              </div>
            </div>

            {!selectedClient ? (
              <div className="mc-no-client">
                <span>👆</span>
                Select a client above to manage their plan
              </div>
            ) : (
              <>
                {/* Date Range */}
                <div className="mc-plan-card" style={{marginBottom:"1.5rem"}}>
                  <div className="mc-plan-header">
                    <span className="mc-plan-title">Plan Schedule for {selectedClient.name}</span>
                    <span className="badge badge-green">Active Client</span>
                  </div>
                  <div className="mc-plan-body">
                    <div className="mc-dates">
                      <div className="form-group" style={{marginBottom:0}}>
                        <label className="label">Start Date *</label>
                        <input type="date" className="input-field" value={startDate} onChange={e => setStartDate(e.target.value)} />
                      </div>
                      <div className="form-group" style={{marginBottom:0}}>
                        <label className="label">End Date *</label>
                        <input type="date" className="input-field" value={endDate} onChange={e => setEndDate(e.target.value)} />
                      </div>
                    </div>
                    {startDate && endDate && (
                      <div style={{background:"rgba(255,107,0,0.06)", border:"1px solid var(--border-orange)", borderRadius:"var(--radius-sm)", padding:"0.75rem 1rem", fontSize:"0.85rem", color:"var(--text-2)"}}>
                        📅 Plan duration: <strong>{Math.ceil((new Date(endDate) - new Date(startDate)) / (1000*60*60*24))} days</strong> ({startDate} → {endDate})
                      </div>
                    )}
                  </div>
                </div>

                {/* Plan Tabs */}
                <div className="mc-plan-tabs">
                  <button className={`mc-plan-tab ${tab === "workout" ? "active" : ""}`} onClick={() => setTab("workout")}>🏋️ Workout Plan</button>
                  <button className={`mc-plan-tab ${tab === "diet" ? "active" : ""}`} onClick={() => setTab("diet")}>🥗 Diet Plan</button>
                </div>

                {/* Workout Plan */}
                {tab === "workout" && (
                  <div className="mc-plan-card">
                    <div className="mc-plan-header">
                      <span className="mc-plan-title">Workout Plan</span>
                      <button className="btn-ghost btn-sm" onClick={addDay}>+ Add Training Day</button>
                    </div>
                    <div className="mc-plan-body">
                      {workoutDays.map((day, dayIdx) => (
                        <div className="mc-day-block" key={dayIdx}>
                          <div className="mc-day-header" onClick={() => toggleDay(dayIdx)}>
                            <div>
                              <span className="mc-day-label">{day.day}</span>
                              {day.focus && <span className="mc-day-focus" style={{marginLeft:"0.75rem"}}>— {day.focus}</span>}
                            </div>
                            <div style={{display:"flex", gap:"0.5rem"}}>
                              <span style={{color:"var(--text-4)", fontSize:"0.8rem"}}>{day.exercises.length} exercises</span>
                              <button className="btn-danger btn-sm" onClick={e => { e.stopPropagation(); removeDay(dayIdx); }}>✕</button>
                              <span style={{color:"var(--text-3)"}}>{day.expanded ? "▲" : "▼"}</span>
                            </div>
                          </div>
                          {day.expanded && (
                            <div className="mc-day-body">
                              <div className="form-group">
                                <label className="label">Day Focus (e.g. Chest & Triceps)</label>
                                <input className="input-field" placeholder="e.g. Back & Biceps" value={day.focus} onChange={e => updateFocus(dayIdx, e.target.value)} />
                              </div>
                              {day.exercises.map((ex, exIdx) => (
                                <div className="mc-exercise-row" key={exIdx}>
                                  <div className="mc-exercise-top">
                                    <span className="mc-exercise-name">💪 {ex.name}</span>
                                    <button style={{background:"none",border:"none",color:"#FF4444",cursor:"pointer",fontSize:"0.9rem"}} onClick={() => removeEx(dayIdx, exIdx)}>✕</button>
                                  </div>
                                  <div className="mc-ex-inputs">
                                    <div className="mc-ex-input-wrap">
                                      <span className="mc-ex-input-label">Sets</span>
                                      <input className="mc-ex-input" value={ex.sets} onChange={e => updateEx(dayIdx, exIdx, "sets", e.target.value)} placeholder="4" />
                                    </div>
                                    <div className="mc-ex-input-wrap">
                                      <span className="mc-ex-input-label">Reps</span>
                                      <input className="mc-ex-input" value={ex.reps} onChange={e => updateEx(dayIdx, exIdx, "reps", e.target.value)} placeholder="8-12" />
                                    </div>
                                    <div className="mc-ex-input-wrap">
                                      <span className="mc-ex-input-label">Rest</span>
                                      <input className="mc-ex-input" value={ex.rest} onChange={e => updateEx(dayIdx, exIdx, "rest", e.target.value)} placeholder="60s" />
                                    </div>
                                    <div className="mc-ex-input-wrap" style={{gridColumn:"1/-1"}}>
                                      <span className="mc-ex-input-label">▶ YouTube URL</span>
                                      <input className="mc-ex-input" style={{width:"100%"}} value={ex.videoUrl} onChange={e => updateEx(dayIdx, exIdx, "videoUrl", e.target.value)} placeholder="https://youtube.com/watch?v=..." />
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <button className="mc-add-ex-btn" onClick={() => setAddExModal(dayIdx)}>+ Add Exercise</button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Diet Plan */}
                {tab === "diet" && (
                  <div className="mc-plan-card">
                    <div className="mc-plan-header">
                      <span className="mc-plan-title">Diet Plan</span>
                    </div>
                    <div className="mc-plan-body">
                      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.75rem", marginBottom:"1.5rem"}}>
                        <div className="form-group" style={{marginBottom:0}}>
                          <label className="label">Daily Calories Target</label>
                          <input type="number" className="input-field" placeholder="e.g. 2400" />
                        </div>
                        <div className="form-group" style={{marginBottom:0}}>
                          <label className="label">Protein Target (g)</label>
                          <input type="number" className="input-field" placeholder="e.g. 180" />
                        </div>
                        <div className="form-group" style={{marginBottom:0}}>
                          <label className="label">Water Target (L)</label>
                          <input type="number" className="input-field" placeholder="e.g. 3" step="0.5" />
                        </div>
                      </div>
                      {dietMeals.map((meal, mealIdx) => (
                        <div className="mc-meal-block" key={mealIdx}>
                          <div className="mc-meal-header">
                            <span className="mc-meal-label">{meal.meal}</span>
                            <span className="mc-meal-time">{meal.time}</span>
                          </div>
                          <div className="mc-meal-body">
                            {meal.foods.map((food, fIdx) => (
                              <div className="mc-food-row" key={fIdx}>
                                <span className="mc-food-name">🥗 {food.name}</span>
                                <input className="mc-food-amount" placeholder="Amount" value={food.amount} onChange={e => updateFoodAmount(mealIdx, fIdx, e.target.value)} />
                                <button style={{background:"none",border:"none",color:"#FF4444",cursor:"pointer"}} onClick={() => removeFoodFromMeal(mealIdx, fIdx)}>✕</button>
                              </div>
                            ))}
                            <div style={{marginTop:"0.5rem"}}>
                              <select className="input-field" style={{fontSize:"0.85rem"}} onChange={e => { const f = mockFoods.find(f=>f.name===e.target.value); if(f) addFoodToMeal(mealIdx, f); e.target.value=""; }}>
                                <option value="">+ Add food from library...</option>
                                {mockFoods.map(f => <option key={f.id} value={f.name}>{f.name} ({f.calories}kcal / {f.unit})</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save Bar */}
                <div className="mc-save-bar">
                  {saved && <span className="mc-save-msg">✅ Plan saved successfully!</span>}
                  <button className="btn-secondary" onClick={() => setSelectedClient(null)}>Cancel</button>
                  <button className="btn-primary" onClick={handleSave}>Save & Assign Plan</button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Add Exercise Modal */}
      {addExModal !== null && (
        <div className="add-ex-modal-overlay" onClick={() => setAddExModal(null)}>
          <div className="add-ex-modal" onClick={e => e.stopPropagation()}>
            <h3 className="add-ex-modal-title">Add Exercise to {workoutDays[addExModal]?.day}</h3>
            <div className="ex-pick-list">
              {mockExercises.map(ex => (
                <div className="ex-pick-item" key={ex.id} onClick={() => addExToDay(addExModal, ex)}>
                  <div>
                    <div className="ex-pick-name">{ex.name}</div>
                    <div className="ex-pick-meta">{ex.category} · {ex.muscle} · {ex.level}</div>
                  </div>
                  <span className="badge badge-orange">+</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:"1rem"}}>
              <button className="btn-secondary" style={{width:"100%"}} onClick={() => setAddExModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}