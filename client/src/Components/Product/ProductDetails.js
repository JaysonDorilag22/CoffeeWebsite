import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'

import Loader from '../Layout/Loader'
import MetaData from '../Layout/MetaData'

import axios from 'axios'
import { toast, } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import logo from './logo512.png';

const ProductDetails = ({cartItems, addItemToCart}) => {

    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [error, setError] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState([])
    // const [state, setState] = useState({
    //     cartItems: localStorage.getItem('cartItems')
    //         ? JSON.parse(localStorage.getItem('cartItems'))
    //         : [], shippingInfo: localStorage.getItem('shippingInfo')
    //             ? JSON.parse(localStorage.getItem('shippingInfo'))
    //             : {},
    // })


    let { id } = useParams()
    let navigate = useNavigate()
    // const alert = useAlert();
    // const { cartItems } = state

    const productDetails = async (id) => {
        let link = `http://localhost:4001/api/v1/product/${id}`
        try {
            let res = await axios.get(link)
            setProduct(res.data.product)
            setLoading(false)

        } catch (err) {
            console.log(err)

            // setLoading(false)
            setError('Product not found')
            setLoading(false)
            // toast.error(error)
            // toast.error(err.response.data.message)
        }

    }
    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }
  

    const addToCart =  async () => {
        await addItemToCart(id, quantity);
    }
    useEffect(() => {
        productDetails(id)
        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_LEFT
            });
            navigate('/')
        }
    }, [id, error,]);
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    // console.log(state.cartItems)
    // console.log(cart)
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="flex justify-center">
                        <div className="w-1/2">
                        <img src={logo}/>
                            {/* <Carousel pause="hover">
                                {product.images &&
                                    product.images.map((image) => (
                                        <Carousel.Item key={image.public_id}>
                                            <img
                                                className="w-full"
                                                src={image.url}
                                                alt={product.title}
                                            />
                                        </Carousel.Item>
                                    ))}
                            </Carousel> */}
                        </div>
                        <div className="w-1/2 mt-5 ml-4">
                            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                            <p id="product_id" className="mb-2">
                                Product # {product._id}
                            </p>
                            {/* Add star rating UI from DaisyUI */}
                            <div className="flex items-center mb-2">
                                <div className="rating-outer w-16 h-4 mr-2">
                                    <div
                                        className="rating-inner bg-blue-500"
                                        style={{
                                            width: `${(product.ratings / 5) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                                <span id="no_of_reviews" className="text-gray-500">
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <p id="product_price" className="text-2xl font-bold mb-2">
                                ${product.price}
                            </p>
                            <div className="stockCounter mb-2">
    <div className="btn-group">
        <button
            className="btn btn-danger minus"
            onClick={decreaseQty}
        >
            -
        </button>
        <input
            type="number"
            className="btn count"
            value={quantity}
            readOnly
        />
        <button
            className="btn btn-primary plus"
            onClick={increaseQty}
        >
            +
        </button>
    </div>
</div>

                            <button
                                type="button"
                                id="cart_btn"
                                className="btn btn-primary"
                                disabled={product.stock === 0}
                                onClick={addToCart}
                            >
                                Add to Cart
                            </button>
                            <p>
                                Status:{" "}
                                <span
                                    id="stock_status"
                                    className={
                                        product.stock > 0
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    }
                                >
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </p>
                            <h4 className="mt-4">Description:</h4>
                            <p>{product.description}</p>
                            <p id="product_seller" className="mt-3">
                                Sold by: <strong>{product.seller}</strong>
                            </p>
                            <button
                                id="review_btn"
                                type="button"
                                className="btn btn-primary mt-4"
                                data-toggle="modal"
                                data-target="#ratingModal"
                            >
                                Submit Your Review
                            </button>
                            <div className="alert alert-danger mt-5">
                                Login to post your review.
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;