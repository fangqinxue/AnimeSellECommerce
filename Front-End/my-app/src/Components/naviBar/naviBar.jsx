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
    search: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
      },
      searchInput: {
        width: "250px",
        padding: "6px 10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
      },
      searchButton: {
        padding: "6px 12px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#E17912",
        color: "white",
        cursor: "pointer",
        fontWeight: 'bold'
      },
  };

function NavBar ({ onSearchSubmit }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [input, setInput] = useState("");

    const handleSearch = () => {
        onSearchSubmit(input);  // 传给父组件（Home.jsx）
      };
    



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

            <div style={styles.search}>
                <input
                type="text"
                placeholder="Search products..."
                onChange={(e) =>setInput(e.target.value)}
                style={styles.searchInput}
                />
                <button onClick={handleSearch} style={styles.searchButton}>
                Search
                </button>
            </div>


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