import React from 'react'
import Link from 'next/link'
function Navbar(props) {
  return (
    <>
    <div>
        <ul>
            <Link href='/'><li>Home</li></Link>
            <Link href='/about'><li>About</li></Link>
            <Link href='/more'><li>More</li></Link>
        </ul>
    </div>
    {props.children}
    </>
  )
}

export default Navbar