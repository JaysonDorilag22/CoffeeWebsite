// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "./logo512.png";

// const Product = ({ product }) => {
//   return (
//     <div className="card card-compact w-96 text-white bg-slate-700 shadow-xl bordered-card flex-wrap">
//       <figure>
//         {/* <img src={product.images[0].url} alt={product.name} /> */}
//         <img src={logo} alt={product.name} />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">
//           <a href={`/product/${product._id}`}>{product.name}</a>
//         </h2>
//         <div className="ratings mt-auto">
//           <div className="rating-outer">
//             <div
//               className="rating-inner"
//               style={{ width: `${(product.ratings / 5) * 100}%` }}
//             ></div>
//           </div>
//           <span id="no_of_reviews">({product.numOfReviews} reviews)</span>
//         </div>
//         <p>${product.price}</p>
//         <div className="card-actions justify-end">
//           <Link to={`/product/${product._id}`} className="btn btn-primary">
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;
import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo512.png";

const Product = ({ product }) => {
  return (
    <div className="card card-compact w-96 text-white bg-slate-700 shadow-xl bordered-card flex-wrap">
      <figure>
        <img src={logo} alt={product.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <a href={`/product/${product._id}`}>{product.name}</a>
        </h2>
        <div className="ratings mt-auto">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(product.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({product.numOfReviews} reviews)</span>
        </div>
        <p>${product.price}</p>
        <div className="card-actions justify-end">
          <Link to={`/product/${product._id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;

