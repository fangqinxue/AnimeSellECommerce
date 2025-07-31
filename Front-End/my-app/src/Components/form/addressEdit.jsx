import NavBar from '../naviBar/naviBar';
import Footer from '../footer/footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PlaceSearchInput from './addressAutoComplete';





function AddressEdit() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isEdit = Boolean(state);


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

  

  const defaultForm = {
    recipientName: '',
    phoneNumber: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    postalCode: '',
    isDefault: false,
    lat: null,
    lng: null,
  };
  

  const [form, setForm] = useState({
    recipientName: '',
    phoneNumber: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    postalCode: '',
    isDefault: false,
    lat: null,
    lng: null,
  });


    useEffect(() => {
        if (isEdit && state) {
        setForm({ ...defaultForm, ...state }); // 合并默认值
        } else {
        setForm(defaultForm);
        }
    }, [state, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };



  const handleSubmit = async () => {

    if (!form.recipientName || !form.phoneNumber || !form.detail) {
        alert("请填写完整的收件信息");
        return;
      }
    
    const data = { ...form, email: user.email };
    try {
      if (isEdit) {
        await axios.post(`http://localhost:3000/api/address/updateAddress/${state._id}`, data);
      } else {
        await axios.post(`http://localhost:3000/api/address/addAddress`, data);
      }
      navigate("/addressSetting");
    } catch (err) {
      console.error('保存地址失败:', err);
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h2>{isEdit ? '编辑地址' : '添加新地址'}</h2>
        <input name="recipientName" placeholder="收件人" value={form.recipientName || ''} onChange={handleChange} style={styles.input} />
        <input name="phoneNumber" placeholder="手机号" value={form.phoneNumber || ''} onChange={handleChange} style={styles.input} />
        <input name="province" placeholder="省份" value={form.province || ''} onChange={handleChange} style={styles.input} />
        <input name="city" placeholder="城市" value={form.city || ''} onChange={handleChange} style={styles.input} />
        <input name="district" placeholder="区县" value={form.district || ''} onChange={handleChange} style={styles.input} />

        <PlaceSearchInput 
          name="detail" 
          cityName= {form.city} 
          onChange={(val) => setForm(prev => ({ ...prev, detail: val }))} 
          valueOld={form.detail || ''} 
          inputStyle={styles.input}  
          onSelect={(poi) => {
            setForm(prev => ({
                ...prev,
                postalCode: poi.postcode,
                detail: poi.name+poi.address,
                province: poi.pname,
                city: poi.cityname,
                district: poi.adname,
                lat: poi.location.split(',')[1],
                lng: poi.location.split(',')[0],
            }));
            }} />




    
            
        <input name="postalCode" placeholder="邮政编码" value={form.postalCode || ''} onChange={handleChange} style={styles.input} />
        <label>
          <input type="checkbox" name="isDefault" checked={form.isDefault  || false} onChange={handleChange} /> 设为默认
        </label>
        <br />
        <button onClick={handleSubmit} style={styles.button}>
          {isEdit ? '保存更改' : '添加地址'}
        </button>

        
      </div>
      <Footer />
    </>
  );
}

const styles = {
  input: {
    display: 'block',
    width: '100%',
    padding: '8px',
    margin: '8px 0'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#E17912',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  }
};

export default AddressEdit;
