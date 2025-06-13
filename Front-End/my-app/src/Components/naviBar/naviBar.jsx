import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import "./naviBar.css"

const styles = {

    link: {
      color: 'green',
      textDecoration: 'none',
      fontWeight: 'bold',
      padding: '5px 10px',
    },
    activeLink: {
      color: 'orange', // 选中高亮色（西瓜红）
      textDecoration: 'underline',
      fontWeight: 'bold',
      padding: '5px 10px',
    },
  };

function NavBar ( ) {

    return(
        <section className='navbar'>

            <img src={logo} alt="logo" />


            <nav>
                <NavLink
                    to="/"
                    end
                    style={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/login"
                
                    style={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                    }
                >
                    Login
                </NavLink>

                <NavLink
                    to="/signup"
                    
                    style={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                    }
                >
                    Signup
                </NavLink>

            </nav>

        </section>
    )
}

export default NavBar