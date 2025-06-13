import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import "./naviBar.css"

function NavBar ( ) {

    return(
        <section className='navbar'>

            <img src={logo} alt="logo" />


            <nav>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                    isActive ? 'text-blue-600 font-bold underline' : 'text-gray-700'
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/login"
                    end
                    className={({ isActive }) =>
                    isActive ? 'text-blue-600 font-bold underline' : 'text-gray-700'
                    }
                >
                    Login
                </NavLink>

                <NavLink
                    to="/signup"
                    end
                    className={({ isActive }) =>
                    isActive ? 'text-blue-600 font-bold underline' : 'text-gray-700'
                    }
                >
                    Signup
                </NavLink>

            </nav>

        </section>
    )
}

export default NavBar