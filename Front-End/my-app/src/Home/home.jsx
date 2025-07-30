import NavBar from "../Components/naviBar/naviBar"
import FigureCarousel from "../Components/header/header"
import Category from "../Components/header/category"
import ProductCard from '../Components/ProductCart/productCart';
import Footer from '../Components/footer/footer'
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home () {
  const [products, setProducts] = useState([]);
  const [expandedFilters, setExpandedFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState(""); // 实际被“提交”搜索的内容






  useEffect(()=>{
    axios.get("http://localhost:3000/api/product/getAllProduct")
    .then(res => {
      const enriched = res.data.map(product => ({
        ...product,
        availability: product.available ? "In Stock" : "Sold Out"
      }));
      
      setProducts(enriched)
      console.log(enriched)
    }
  
  )
    .catch(err => console.log(err))
},[])



const toggleFilter = (filter) => {
  setExpandedFilters(prev =>
    prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
  );
};

const filterOptions = {
  // Category: ["Figure", "Nendoroid", "Scale", "POP UP PARADE"],
  Price: ["Under $50", "$50 - $100", "Over $100"],
  Availability: ["In Stock", "Sold Out"],//暂时不加preorder，因为后端数据没有这一个
};

const filters = ["Price", "Availability"];


const handleFilterChange = (filter, value, checked) => {
  setSelectedFilters(prev => {
    const current = prev[filter] || [];
    const updated = checked
      ? [...current, value]
      : current.filter(item => item !== value);

    return {
      ...prev,
      [filter]: updated
    };
  });
};

const filteredProducts = products.filter(product => {
  const matchPrice = !selectedFilters.Price || selectedFilters.Price.length === 0 || selectedFilters.Price.some(priceRange => {
    const price = parseFloat(product.price);
    if (priceRange === "Under $50") return price < 50;
    if (priceRange === "$50 - $100") return price >= 50 && price <= 100;
    if (priceRange === "Over $100") return price > 100;
    return true;
  });

  const matchAvailability = !selectedFilters.Availability || selectedFilters.Availability.length === 0 ||
    selectedFilters.Availability.includes(product.availability); // 确保 product 有这个字段


    const matchSearch =
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));


  return matchPrice && matchAvailability && matchSearch;
});

const sortedProducts = [...filteredProducts].sort((a, b) => {
  const priceA = parseFloat(a.price);
  const priceB = parseFloat(b.price);

  if (sortOption === "priceLowHigh") return priceA - priceB;
  if (sortOption === "priceHighLow") return priceB - priceA;
  if (sortOption === "newest") return new Date(b.release_date) - new Date(a.release_date);

  return 0; // 默认顺序
});


    return (
        <div>
                    <NavBar onSearchSubmit={setSearchQuery}></NavBar>
                    <div style={styles.header}>
                        <Category></Category>
                        <FigureCarousel></FigureCarousel>

                    </div>


                    <p style={{ textAlign: "center", fontSize: "40px" }}>
                      {searchQuery ? `Search results for: "${searchQuery}"` : "Products"}
                    </p>


                    <div style={styles.sortContainer}>
                        <label htmlFor="sort" style={{ fontWeight: "bold", marginRight: "10px" }}>Sort by:</label>
                        <select
                          id="sort"
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                          style={styles.sortSelect}
                        >
                          <option value="default">Default</option>
                          <option value="priceLowHigh">Price: Low to High</option>
                          <option value="priceHighLow">Price: High to Low</option>
                          <option value="newest">Newest</option>
                        </select>
                      </div>

                    <div style={styles.container}>
                      <aside style={styles.sidebar}>
                        <h3>Filter By:</h3>
                        {filters.map(filter => (
                          <div key={filter} style={{ marginBottom: "10px" }}>
                            <button onClick={() => toggleFilter(filter)} style={styles.filterButton}>
                              {filter} {expandedFilters.includes(filter) ? '−' : '+'}
                            </button>
                            {expandedFilters.includes(filter) && (
                                <div style={styles.filterOptions}>
                                  {(filterOptions[filter] || []).map((option) => (
                                    <label key={option} style={{ display: 'flex', fontSize: '15px',justifyContent:"center", alignItems:'center'}}>
                                      <input
                                        style={{width:"20px"}}
                                        type="checkbox"
                                        value={option}
                                        onChange={(e) => handleFilterChange(filter, option, e.target.checked)}
                                      />
                                      {option}
                                    </label>
                                  ))}
                                </div>
                              )}

                          </div>
                        ))}
                      </aside>




                        <div style={styles.card}>
                          {sortedProducts.length > 0 ? (
                            sortedProducts.map((pro) => (
                              <ProductCard key={pro._id} product={pro} />
                            ))
                          ) : (
                            <p style={styles.noResult}>
                              No products found{searchQuery && ` for "${searchQuery}"`}!
                            </p>
                          )}
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
      display:"flex",
      textAlign:"center",
      margin: "0 auto",
      padding: "0 20px",
      width:"80%",
    },
    sidebar: {
      width: "200px",
      marginRight: "30px",
    },
    filterButton: {
      width: "100%",
      textAlign: "left",
      padding: "8px",
      border: "1px solid #ccc",
      backgroundColor: "#f5f5f5",
      borderRadius: "4px",
      cursor: "pointer"
    },
    filterOptions: {
      paddingLeft: "10px",
      paddingTop: "4px"
    },
    sortContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: "20px",
      width: "100%"
    },
    sortSelect: {
      padding: "6px",
      borderRadius: "4px",
      border: "1px solid #ccc"
    },
    noResult: {
      fontSize: "18px",
      color: "#999",
      textAlign: "center",
      width: "100%",
      marginTop: "50px"
    }

  };
  
export default Home;