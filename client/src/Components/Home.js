import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MetaData from "./Layout/MetaData";
import axios from "axios";
import Product from "./Product/Product";
import Loader from "./Layout/Loader";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const categories = [
  "Electronics",
  "Cameras",
  "Laptops",
  "Accessories",
  "Headphones",
  "Food",
  "Books",
  "Clothes/Shoes",
  "Beauty/Health",
  "Sports",
  "Outdoor",
  "Home",
];

const Home = () => {
  const { keyword } = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [productsCount, setProductsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(0);
  const [filteredProductsCount, setFilteredProductsCount] = useState(0);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const getProducts = async (page = 1, keyword = "", price, category = "") => {
    try {
      let link = `http://localhost:4001/api/v1/products/?page=${page}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}`;

      if (category) {
        link = `${process.env.REACT_APP_API}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;
      }

      console.log(link);
      const res = await axios.get(link);
      console.log(res);
      setProducts(res.data.products);
      setResPerPage(res.data.resPerPage);
      setProductsCount(res.data.productsCount);
      setFilteredProductsCount(res.data.filteredProductsCount);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      setLoading (false);
    }
  };

  useEffect(() => {
    getProducts(currentPage, keyword, price, category);
  }, [currentPage, keyword, price, category]);

  let count = keyword ? filteredProductsCount : productsCount;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <div className="container container-fluid">
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
              {keyword ? (
                <div className="col-3">
                  <div className="px-5">
                    <Slider
                      min={1}
                      max={1000}
                      defaultValue={[1, 1000]}
                      value={price}
                      onChange={setPrice}
                    />
                    <hr className="my-5" />
                    <div className="mt-5">
                      <h4 className="mb-3">Categories</h4>
                      <ul className="pl-0">
                        {categories.map((cat) => (
                          <li
                            style={{
                              cursor: "pointer",
                              listStyleType: "none",
                            }}
                            key={cat}
                            onClick={() => setCategory(cat)}
                          >
                            {cat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              )}
            </section>
            {resPerPage <= count && (
              <div className="pagination">
                <button
                  className="pagination-item btn"
                  onClick={() => setCurrentPageNo(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {Array.from({ length: Math.ceil(count / resPerPage) }).map(
                  (item, index) => (
                    <button
                      key={index}
                      className={`pagination-item btn ${
                        currentPage === index + 1 ? "btn-active" : ""
                      }`}
                      onClick={() => setCurrentPageNo(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}
                <button
                  className="pagination-item btn"
                  onClick={() => setCurrentPageNo(currentPage + 1)}
                  disabled={currentPage === Math.ceil(count / resPerPage)}
                >
                  Next
                </button>
              </div>
            )}
            {error && <div className="error">{error}</div>}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
