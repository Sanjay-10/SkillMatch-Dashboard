import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
    <header className="absolute max-w-7xl mx-auto px-8 inset-x-0 top-0 z-50  ">
    <nav
      aria-label="Global"
      className="flex items-center justify-between  mt-5 " 
    >

        <Link to="/">
      <div className="flex lg:flex-1 ">
        <h5 className="SkillMatch text-[#007bff] font-semibold -m-1.5 p-1.5 text-3xl sm:text-xl md:text-2xl">
          SkillMatch
        </h5>
      </div>
        </Link>

      <div className="flex flex-1 items-center justify-end p-1.5 font-semibold">
        <Link to="/contact">
          Contact Us <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </nav>
  </header>
  </div>
  )
}

export default Header