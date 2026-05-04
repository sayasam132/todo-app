import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("tareas")
    return guardadas ? JSON.parse(guardadas) : []
  })
  const [nueva, setNueva] = useState("")

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas))
  }, [tareas])

  const agregar = () => {
    if (nueva.trim() === "") return
    setTareas([...tareas, { texto: nueva, hecha: false }])
    setNueva("")
  }

  const toggleHecha = (i) => {
    const copia = [...tareas]
    copia[i].hecha = !copia[i].hecha
    setTareas(copia)
  }

  const eliminar = (i) => {
    setTareas(tareas.filter((_, idx) => idx !== i))
  }

  return (
    <div className="app">
      <h1>Mis Tareas</h1>
      <div className="input-row">
        <input
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregar()}
          placeholder="Nueva tarea..."
        />
        <button onClick={agregar}>Agregar</button>
      </div>
      <ul>
        {tareas.map((t, i) => (
          <li key={i} className={t.hecha ? "hecha" : ""}>
            <span onClick={() => toggleHecha(i)}>{t.texto}</span>
            <button onClick={() => eliminar(i)}>✕</button>
          </li>
        ))}
      </ul>
      {tareas.length === 0 && <p className="vacio">No hay tareas aún 👀</p>}
    </div>
  )
}

export default App