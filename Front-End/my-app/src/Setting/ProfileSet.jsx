
import NavBar from '../Components/naviBar/naviBar';
import Footer from '../Components/footer/footer';
import { useState } from 'react';

function ProfileSetting () {
    const [selectedSetting, setSelectedSetting] = useState(null); // 当前选中的设置项
    const [username, setUsername] = useState('');
    const [passwords, setPasswords] = useState({ current: '', new: '' });

    const renderContent = () => {
        switch (selectedSetting) {
          case 'username':
            return (
              <div>
                <h3>修改用户名</h3>
                <input
                  type="text"
                  placeholder="新用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={style.input}
                />
                <button style={style.button}>保存用户名</button>
              </div>
            );
          case 'password':
            return (
              <div>
                <h3>修改密码</h3>
                <input
                  type="password"
                  placeholder="当前密码"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  style={style.input}
                />
                <input
                  type="password"
                  placeholder="新密码"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  style={style.input}
                />
                <button style={style.button}>更新密码</button>
              </div>
            );
          default:
            return <p>请选择一个设置项</p>;
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
        },
        input: {
            padding: '8px',
            margin: '10px 0',
            width: '100%',
            maxWidth: '300px',
          },
          button: {
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