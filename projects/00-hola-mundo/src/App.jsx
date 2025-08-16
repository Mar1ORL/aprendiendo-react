import { useState } from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

// Normalmente queremos renderizar componentes en función de datos que recibimos, imaginemos que tenemos un array de usuarios:

const users = [
  { name: 'LanaRhoades', userName: 'LanaRhds', initialIsFollowing: true },
  { name: 'Midudev', userName: 'Midu', initialIsFollowing: false },
  { name: 'ElRubius', userName: 'Rubius', initialIsFollowing: false },
  { name: 'AuronPlay', userName: 'AuronPlay', initialIsFollowing: true },
];



export function App() {


  return (
    <section className='App'>
      {/* Podemos pasar una función como prop al componente */}
      {/* Si queremos que nuestro componente use la prop "children", tenemos que envolverlo en etiquetas de apertura y cierre, todo lo que se envuelva será accedido con children en el prop del componente */}

      {/* Usamos la convención 'initial...' para setear un estado inicial de un estado interno, es importante saber que no se va a renderizar otra vez aun que se le cambie el valor con otro estado a ese estado inicial */}
      {
        users.map(user => {
          const { name, userName, initialIsFollowing } = user;
          return (
            <TwitterFollowCard 
              key={userName}   // <- Usamos userName como key porque es único
              userName={userName} 
              initialIsFollowing={initialIsFollowing}
            >
              {name}
            </TwitterFollowCard>
          )
        })
      }
    </section>
  )
}