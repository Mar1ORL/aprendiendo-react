import { useEffect, useState } from "react"

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    
    // funcion que se llama cada vez que se mueve el ratón
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY})
    }

    // solo nos "suscribimos" al evento (event listener) si enabled es true
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // funcion de limpieza que se ejecuta cuando el componente se desmonta o cuando cambia el estado de dependencias
    return () => {
      console.log('Limpiando efecto')
      window.removeEventListener('pointermove', handleMove)
    }

  }, [enabled])


  /* Explicación de useEffect: 
     1. Es una manera de ejecutar código arbitrario (primer argumento)
     2. En función de dependencias pasadas como un array (segundo argumento)
     NOTA: 
        Si el array de dependencias está vacío, el efecto se ejecuta solo una vez al montar el componente.
        Si no se pasa el array de dependencias, el efecto se ejecuta en cada renderizado del componente.
      
  */
  const handleEnabled = () => {
    setEnabled(!enabled);
  }

  return (
    <main>
      { /* describimos la bolita */}
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }} />


      <button onClick={handleEnabled}>
        {enabled ? 'Desactivar' : 'Activar'} seguidor de ratón
      </button>
    </main>
  )
}

export default App
