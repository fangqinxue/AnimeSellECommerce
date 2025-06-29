import NavBar from "../Components/naviBar/naviBar"
import FigureCarousel from "../Components/header/header"
import Category from "../Components/header/category"
import ProductCard from '../Components/ProductCart/productCart';
import Footer from '../Components/footer/footer'
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home () {
  const [products, setProducts] = useState([]);


  useEffect(()=>{
    axios.get("http://localhost:3000/api/product/getAllProduct")
    .then(res => setProducts(res.data))
    .catch(err => console.log(err))
},[])

    return (
        <div>
                    <NavBar></NavBar>
                    <div style={styles.header}>
                        <Category></Category>
                        <FigureCarousel></FigureCarousel>

                    </div>


                    <div style={styles.container}>
                      <p>Products</p>
                      <div style={styles.card}>

                      {products.map((pro) => (
                          <ProductCard
                          product={pro}
                          >
                          </ProductCard>
                      ))}

                      </div>

                    </div>

                    <Footer></Footer>



        </div>


    )
}

const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between"
    },
    card: {

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "30px", // 推荐加这个，替代你之前卡片的 margin

          
    },
    container: {
      textAlign:"center",
      margin: "0 auto",
      padding: "0 20px",
      width:"80%",

    }

  };
  
export default Home;