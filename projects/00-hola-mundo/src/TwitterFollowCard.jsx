import { useState } from "react";     // Hooks 

// Podemos inicializar las props con valores por defecto en caso de no recibirlas (userName por ejemplo)
export function TwitterFollowCard({ children, userName = 'unknown', initialIsFollowing = false }) {
  
  // Las props que recibimos las debemos mantener inmutables, no podemos modificarlas directamente

  // useState nos devuelve un array con dos elementos:
  // 1. El estado actual
  // 2. Una función para actualizar el estado
  const[isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const imgSrc = `https://unavatar.io/${children}/`
  const textIsFollowing = isFollowing ? 'Siguiendo' : 'Seguir';
  const buttonClassName = isFollowing ? 'is-following' : 'tw-follow-card-button';


  const handleClick = () => {
    setIsFollowing(!isFollowing);
  }


  return (
    <article className='tw-follow-card'>

      <header className='tw-follow-card-header'>
        <img src={imgSrc} alt="Lana Rhoades" className='tw-follow-card-avatar' />
        <div className='tw-follow-card-strong'>
          {children} 
          <span className='tw-follow-card-span'> @{userName} </span>
        </div>
      </header>

      <aside>
        <button className={buttonClassName} onClick={handleClick}> {textIsFollowing} </button>
      </aside>

    </article>
  )
}