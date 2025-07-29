import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AMapKey = 'b2efdd7f24f6db55515a63fdd3fc8699'; // 请使用你自己的 Key

function PlaceSearchInput({onChange, onSelect,inputStyle, cityName, valueOld }) {
  const [input, setInput] = useState(valueOld || '');
  const [results, setResults] = useState([]);
  const wrapperRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    setInput(valueOld || '');
  }, [valueOld]);

  //添加一个点击外部页面关闭下拉框事件
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const searchPlace = async (keyword) => {

    console.log('搜索关键词:', keyword, '城市:', cityName);
    if (!keyword) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get('https://restapi.amap.com/v3/place/text', {
        params: {
          key: AMapKey,
          keywords: keyword,
          city: cityName || '全国' ,
          output: 'JSON',
          offset:10
        },
      });

      if (res.data.status === '1') {
        setResults(res.data.pois);
      } else {
        console.error('搜索失败', res.data.info);
      }
    } catch (err) {
      console.error('请求出错:', err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    console.log('输入变化:', value); // ✅ 看看输入事件有没有触发
    setInput(value);
    if (onChange) onChange(value);  // 把输入变化同步给父组件



    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if ( value.length >= 2) {
      debounceTimer.current = setTimeout(() => {
        console.log('✅ 调用 searchPlace', value);
        searchPlace(value);
      }, 800);
    } else {
      setResults([]);
    }
  };



  const handleSelect = (poi) => {
    setInput(poi.name);
    if (onChange) onChange(poi.name); 
    setResults([]);
    if (onSelect) onSelect(poi);
  };

  return (
    <div style={{ position: 'relative' }}  ref={wrapperRef}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="请输入地址关键词"
        style={inputStyle}
      />
      {results.length > 0 && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#fff',
          border: '1px solid #ddd',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 1000,
          margin: 0,
          padding: 0,
          listStyle: 'none'
        }}>
          {results.map((item) => (
            <li
              key={item.id}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0'
              }}
              onClick={() => handleSelect(item)}
            >
              <strong>{item.name}</strong>
              <div style={{ fontSize: '12px', color: '#666' }}>{item.address}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlaceSearchInput;