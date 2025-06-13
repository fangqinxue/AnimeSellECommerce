import React, { useState, useEffect } from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';

const banners = [
  {
    id: 1,
    title: '限定火影鸣人手办',
    image: '/images/naruto.png',
    link: '/product/1',
  },
  {
    id: 2,
    title: '鬼灭之刃炭治郎',
    image: '/images/tanjiro.png',
    link: '/product/2',
  },
  {
    id: 3,
    title: '海贼王路飞限量版',
    image: '/images/luffy.png',
    link: '/product/3',
  },
];

function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i) => setIndex(i);

  return (
    <div className="banner-carousel">
      <div
        className="slides-container"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((item) => (
          <div
            className="slide"
            key={item.id}
            onClick={() => navigate(item.link)}
          >
            <img src={item.image} alt={item.title} />
            <div className="caption">{item.title}</div>
          </div>
        ))}
      </div>

      <div className="dots">
        {banners.map((_, i) => (
          <span
            key={i}
            className={i === index ? 'dot active' : 'dot'}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerCarousel;
