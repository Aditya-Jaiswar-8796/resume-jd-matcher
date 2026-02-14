import React from 'react'

const Tick = (props) => {
let find = props.find;
  return (
    <div>
        {find ?
      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
     : <svg className="h-5 w-5 text-destructive/70" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}</div>
  )
}

export default Tick
