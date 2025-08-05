
import NavBar from '../Components/naviBar/naviBar';
import Footer from '../Components/footer/footer';
import { useState } from 'react';
import axios from 'axios';

function ProfileSetting () {
    const [selectedSetting, setSelectedSetting] = useState(null); // 当前选中的设置项
    const [username, setUsername] = useState('');
    const [passwords, setPasswords] = useState({ current: '', new: '' });
    const user = JSON.parse(localStorage.getItem('user'));

    const handleUsernameChange = async () => {
      if (!username.trim()) {
        alert("❗User name cannot be empty");
        return;
      }
      try {
        const res = await axios.put('http://localhost:3000/api/auth/changeUsername', {
          email: user.email,
          newUsername: username,
        });

       
        alert('✅ User name updated successfully!');
        // 更新本地存储
        const updatedUser = { ...user, username };
        localStorage.setItem('user', JSON.stringify(updatedUser));

      } catch (err) {
        console.error('fail to update', err);
        const errorMessage = err.response.data.message

        alert(errorMessage)
      }
    };
  
    const handlePasswordChange = async () => {
      if (!passwords.current || !passwords.new) {
        alert("❗Please write all");
        return;
      }
      if (passwords.new.length < 6) {
        alert("❗New password at least 6 long");
        return;
      }

      if (passwords.current === passwords.new) {
        alert("❗New Password can not be same as old one");
        return;
      }
      
      try {
        const res = await axios.put('http://localhost:3000/api/auth/changePassword', {
          email: user.email,
          currentPassword: passwords.current,
          newPassword: passwords.new,
        });

        alert('✅ Password Update Successfully');
        setPasswords({ current: '', new: '' });
      } catch (err) {
        console.error('fail to update', err);
        const errorMessage = err.response.data.message

        alert(errorMessage)
      }
    };

    const renderContent = () => {
        switch (selectedSetting) {
          case 'username':
            return (
              <div style={{display:"flex", flexDirection:'column', alignItems:'left'}}>
                <h3>Change User Name</h3>
                <input
                  type="text"
                  placeholder="New User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={style.input}
                />
                <button onClick={handleUsernameChange} style={style.button}>Save User Name</button>
              </div>
            );
          case 'password':
            return (
              <div style={{display:"flex", flexDirection:'column'}}>
                <h3>Change Password</h3>
                <input
                  type="password"
                  placeholder="Old Password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  style={style.input}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  style={style.input}
                />
                <button onClick={handlePasswordChange} style={style.button}>Update Password</button>
              </div>
            );
          default:
            return <p>Please select an setting item</p>;
        }
      };

    const style = {
        settingItem: {
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid #ccc',
            margin: '10px 0',
            padding: '10px',
            cursor: 'pointer',
          },
          sidebar: {
            width: '250px',
            borderRight: '1px solid #ddd',
            paddingRight: '20px',
          },
        content: {
            flex: 1,
            paddingLeft: '20px',
          },
        container: {
        display: 'flex',
        padding: '20px',
        margin:"40px 100px"
        },
        input: {
            padding: '8px',
            margin: '10px 0',
            width: '100%',
            maxWidth: '300px',
          },
          button: {
            width:'300px',
            padding: '8px 16px',
            backgroundColor: '#E17912',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px',
          }
    }

    return(
        <>
            <NavBar></NavBar>

            <div style={{textAlign:'center', fontSize:'40px', fontWeight:"bold", color:'orange'}}>Profile Setting</div>
                <div style={style.container}>

                    <div style={style.sidebar}>
                        <div style={style.settingItem} onClick={() => setSelectedSetting('username')}>
                            <p>Change Username</p>
                            <p>{'>'}</p>
                        </div>

                        <div style={style.settingItem} onClick={() => setSelectedSetting('password')}>
                            <p>Change Password</p>
                            <p>{'>'}</p>
                        </div>
                    </div>

                    <div style={style.content}>
                    {renderContent()}
                    </div>


                </div>



            <Footer></Footer>
        </>
    )
}

export default ProfileSetting