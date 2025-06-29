import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import "./naviBar.css";
import { isLoggedIn, logout } from '../../utils/auth';
import React, { useEffect, useState } from 'react';

const styles = {

    link: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold',
      padding: '5px 10px',
    },
    activeLink: {
      color: '#E17912', // 选中高亮色（西瓜红）
      textDecoration: 'none',
      fontWeight: 'bold',
      padding: '5px 10px',
    },
  };

function NavBar ( ) {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        setLoggedIn(isLoggedIn());
      }, []);
    
      const handleLogout = () => {
        logout();
        setLoggedIn(false);
      };

      const user = JSON.parse(localStorage.getItem('user'));

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


                {loggedIn ? (
                        <div>
                            <p>{user?.username}</p>
                            <button onClick={handleLogout}>log out</button>
                        </div>
                        ) : (
                            <div>
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
        
                        </div>

                        )}





            </nav>

        </section>
    )
}

export default NavBar