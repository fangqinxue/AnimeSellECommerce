import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import "./naviBar.css";
import { isLoggedIn, logout } from '../../utils/auth';
import React, { useEffect, useState,useRef } from 'react';
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
      seller:{
        padding:"2px 2px",
        width:"60px",
        fontSize: "12px",
        cursor:"pointer"
      },
      dropdownItem: {
        display: 'block',
        padding: '10px 15px',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: 'black',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
        whiteSpace: 'nowrap'

      },
      dropdownMenu:{
        display: "flex",
        flexDirection: "column",
        position: 'absolute',
        right: -55,
        top: '120%',
        background: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        borderRadius: '10px',
        overflow: 'hidden',
        zIndex: 999,
        minWidth: '160px',
        animation: 'fadeIn 0.2s ease-in-out'
      },

  };
  const dropdownItemStyle = {

  };


function NavBar ({ onSearchSubmit }) {

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [input, setInput] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);



    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)
        ) {
          setDropdownOpen(false);
        }
      };
    
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);


    const handleSearch = () => {
        onSearchSubmit(input);  // 传给父组件（Home.jsx）
      };
    
      const Navigate = useNavigate();


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

            <div>
                <button onClick={() => Navigate("/sellerLogin")} style={styles.seller}>卖家中心</button>
            </div>

            <div style={styles.search}>
                <input
                type="text"
                placeholder="Search products..."
                onChange={(e) =>setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(); // 按 Enter 时触发搜索
                    }
                  }}
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
                    <div style={{ 
                      width: '50px',
                      height: '50px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #E17912, #f8b26a)',
                      color: 'white',
                      fontWeight: 'bold',
                      // fontSize: '18px',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.3s, transform 0.3s',
                      boxShadow: dropdownOpen ? '0 0 10px rgba(255, 193, 7, 0.7)' : 'none'}}>
                        <button 
                        ref={buttonRef}
                        style={{
                            // fontSize:"5px",
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                        {user?.username} 
                        </button>

                        {dropdownOpen && (
                        <div 
                        ref={dropdownRef}
                        className="dropdownMenu"
                        style={styles.dropdownMenu
                          }>
                            <NavLink to="/profile" className="dropdownItem" style={styles.dropdownItem}>👤 个人资料</NavLink>
                            <NavLink to="/orders" className="dropdownItem" style={styles.dropdownItem}>📦 我的订单</NavLink>
                            <NavLink to="/settings" className="dropdownItem" style={styles.dropdownItem}>⚙️ 设置</NavLink>
                            <div onClick={handleLogout} className="dropdownItem" style={styles.dropdownItem}>🚪 登出</div>
                        </div>
                        )}
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