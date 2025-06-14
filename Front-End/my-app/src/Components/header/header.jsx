// src/components/FigureCarousel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const FigureCarousel = () => {
  const [figures, setFigures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 加载数据
  useEffect(() => {
    axios.get("http://localhost:3000/api/product/getHighRateProduct")
      .then(res => setFigures(res.data))
      .catch(err => console.error("Failed to fetch figures:", err));
  }, []);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % figures.length);//通过取余计算获的一直下一个，到最后一个返回第0个的。
    }, 3000);
    return () => clearInterval(timer);
  }, [figures]);

  if (figures.length === 0) return <div>加载中...</div>;

  const figure = figures[currentIndex];
  console.log (figure.images[0])
  const imgs = "http://localhost:3000"+figure.images[0]

  return (
    <div style={styles.carousel}>
      <div style={styles.imageWrapper}>
        <img
          src={imgs}
          alt={figure.name}
          style={styles.image}
        />
        <div style={styles.caption}>
          <h2>{figure.name}</h2>
          <p>{figure.anime} - {figure.character}</p>
          <p>⭐ {figure.rating}</p>
        </div>
      </div>

      {/* 左右按钮 */}
      <button style={styles.arrowLeft} onClick={() =>
        setCurrentIndex(prev => prev === 0 ? figures.length - 1 : prev - 1)
      }>‹</button>
      <button style={styles.arrowRight} onClick={() =>
        setCurrentIndex(prev => (prev + 1) % figures.length)
      }>›</button>

      {/* 小圆点导航 */}
      <div style={styles.dots}>
        {figures.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              ...styles.dot,
              backgroundColor: i === currentIndex ? "#333" : "#bbb"
            }}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  carousel: {
    maxWidth: "100%",
    margin: "50px auto",
    position: "relative",
  },
  imageWrapper: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  },
  image: {
    width: "100%",
    height: "400px",
    objectFit: "fill",
    transition: "opacity 0.5s ease"
  },
  caption: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    background: "rgba(0,0,0,0.6)",
    color: "white",
    padding: "12px"
  },
  arrowLeft: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    fontSize: "24px",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer"
  },
  arrowRight: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    fontSize: "24px",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer"
  },
  dots: {
    textAlign: "center",
    marginTop: "10px"
  },
  dot: {
    display: "inline-block",
    width: "10px",
    height: "10px",
    margin: "0 5px",
    borderRadius: "50%",
    cursor: "pointer"
  }
};

export default FigureCarousel;

