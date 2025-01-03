import React from 'react'

function RedBadge({title}) {
  return (  
    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium m-1 text-red-700 ring-1 ring-inset ring-red-600/10">
    {title}
  </span>
  )
}

export default RedBadge