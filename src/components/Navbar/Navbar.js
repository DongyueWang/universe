import React from 'react'
import { NavLink, Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-light mb-4">
            <div className="container">
                <Link to='/' className="fs-3 ubuntu navbar-brand">cosmic&nbsp;<span className="text-primary"> panorama </span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">

                    <style jsx>
                        {
                            `
                            button[aria-expanded="false"]>.close{
                                display:none;
                            }
                           
                            button[aria-expanded="true"]>.open{
                                display:none;
                            }
                            
                            `
                        }
                    </style>
                    <i className="fa-solid fa-bars open fw-bold text-dark"></i>
                    <i className="fa-solid fa-x close fw-bold text-dark"></i>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav fs-5">
                        <li className="nav-item">
                            <NavLink activeclassname='active' to='/' className="nav-link" aria-current="page" >Best Pictures of days</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeclassname='active' to='/Sun' className="nav-link" aria-current="page" > Sun </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeclassname='active' to='/Sun' className="nav-link" aria-current="page" > Earth </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
