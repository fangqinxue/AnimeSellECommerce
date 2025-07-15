import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import "./naviBar.css";
import { isLoggedIn, logout } from '../../utils/auth';
import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";

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


    // loggedIn 只在 NavBar 组件挂载时检查一次，
    // 而当你在其他页面点击 logout 时，
    // NavBar 不会重新检测登录状态，也不会自动刷新。
    // 使用 useState 存储登录状态，它仅在当前组件中有效，不会响应其他页面触发的 logout()。
    useEffect(() => {
    const handleStorageChange = () => {
        setLoggedIn(isLoggedIn());
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange()
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
    
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


                <NavLink
                    to="/shopcart"
                    end
                    style={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                    }
                >
                    <FaShoppingCart></FaShoppingCart>
                </NavLink>




            </nav>

        </section>
    )
}

export default NavBar