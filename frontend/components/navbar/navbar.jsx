import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <>
        <div className="flex flex-wrap">
        <section className="relative mx-auto">
           
            <nav className="flex justify-between bg-gray-900 text-white w-screen">
            <div className="px-5 xl:px-12 py-2 flex w-full items-center">
                <Link className="text-3xl font-bold font-heading" href="/">
                 {/* <img className="h-9" src="logo.png" alt="logo">  */}
                Logo Here.
                </Link>
                {/* <!-- Nav Links --> */}
                <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li><Link className="hover:text-gray-200" href="/">Home</Link></li>
                <li><Link className="hover:text-gray-200" href="/main/vendors">Vendors</Link></li>
                <li><Link className="hover:text-gray-200" href="/main/products">Products</Link></li>
                {/* <li><a className="hover:text-gray-200" href="#"></a></li> */}
                </ul>
                {/* <!-- Header Icons --> */}
                <div className="hidden xl:flex items-center space-x-5 ">
                {/* <a className="hover:text-gray-200" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </a> */}
                <Link className="flex items-center hover:text-gray-200" href="/main/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                        </span>
                    </span>
                </Link>
                {/* <!-- Sign In / Register      --> */}
                <Link className="flex items-center hover:text-gray-200" href="/auth/login">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Link>
                
                </div>
            </div>
            {/* <!-- Responsive navbar --> */}
            <Link className="xl:hidden flex mr-6 items-center" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                </span>
                </span>
            </Link>
            <Link className="navbar-burger self-center mr-12 xl:hidden" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </Link>
            </nav>
            
        </section>
        </div>
       
        
    </>
  )
}

export default Navbar