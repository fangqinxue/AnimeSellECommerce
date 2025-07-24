import NavBar from '../naviBar/naviBar';
import Footer from '../footer/footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function AddressEdit() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isEdit = Boolean(state);

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

  const detailInputRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (state) {
      setForm(state);
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
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

  useEffect(() => {
    if (window.BMapGL && mapRef.current && !mapInstance.current) {
      mapInstance.current = new window.BMapGL.Map(mapRef.current);
      const point = new window.BMapGL.Point(116.404, 39.915);
      mapInstance.current.centerAndZoom(point, 12);

      mapInstance.current.addEventListener("click", function (e) {
        const { lat, lng } = e.latlng;
        const point = new window.BMapGL.Point(lng, lat);
        const geocoder = new window.BMapGL.Geocoder();

        geocoder.getLocation(point, function (result) {
          if (result && result.addressComponents) {
            const { province, city, district, street, streetNumber } = result.addressComponents;
            setForm((prev) => ({
              ...prev,
              province,
              city,
              district,
              detail: street + streetNumber,
              lat,
              lng
            }));
            mapInstance.current.clearOverlays();
            const marker = new window.BMapGL.Marker(point);
            mapInstance.current.addOverlay(marker);
          }
        });
      });
    }
  }, []);

//   useEffect(() => {
//     if (window.BMap && detailInputRef.current && !autoCompleteRef.current) {
//       const autoComplete = new window.BMap.Autocomplete({
//         input: detailInputRef.current,
//         location: mapInstance.current?.getCenter() || "北京"
//       });

//       autoComplete.addEventListener("onconfirm", function (e) {
//         const value = e.item.value;
//         const fullAddress = value.province + value.city + value.district + value.street + value.business;

//         const myGeo = new window.BMap.Geocoder();
//         myGeo.getPoint(fullAddress, function (point) {
//           if (point) {
//             setForm((prev) => ({
//               ...prev,
//               province: value.province,
//               city: value.city,
//               district: value.district,
//               detail: value.street + value.business,
//               lat: point.lat,
//               lng: point.lng
//             }));
//             mapInstance.current.centerAndZoom(point, 16);
//             const marker = new window.BMapGL.Marker(point);
//             mapInstance.current.clearOverlays();
//             mapInstance.current.addOverlay(marker);
//           }
//         });
//       });

//       autoCompleteRef.current = autoComplete;
//     }
//   }, []);

  return (
    <>
      <NavBar />
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h2>{isEdit ? '编辑地址' : '添加新地址'}</h2>
        <input name="recipientName" placeholder="收件人" value={form.recipientName} onChange={handleChange} style={styles.input} />
        <input name="phoneNumber" placeholder="手机号" value={form.phoneNumber} onChange={handleChange} style={styles.input} />
        <input name="province" placeholder="省份" value={form.province} onChange={handleChange} style={styles.input} />
        <input name="city" placeholder="城市" value={form.city} onChange={handleChange} style={styles.input} />
        <input name="district" placeholder="区县" value={form.district} onChange={handleChange} style={styles.input} />
        <input
          ref={detailInputRef}
          name="detail"
          placeholder="详细地址（可选中建议或地图点击）"
          value={form.detail}
          onChange={handleChange}
          style={styles.input}
        />
        <input name="postalCode" placeholder="邮政编码" value={form.postalCode} onChange={handleChange} style={styles.input} />
        <label>
          <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={handleChange} /> 设为默认
        </label>
        <br />
        <button onClick={handleSubmit} style={styles.button}>
          {isEdit ? '保存更改' : '添加地址'}
        </button>

        <div ref={mapRef} style={{ width: '100%', height: '300px', marginTop: '20px' }}></div>
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
