import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div style={{ zIndex: 10, position: 'absolute' }}>
            <Link to="/">Home</Link>
            <Link to='lists'>Lists</Link>
        </div>
    )
}

export default Navbar;