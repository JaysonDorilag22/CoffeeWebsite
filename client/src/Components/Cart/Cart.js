import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import { useParams, useNavigate } from 'react-router-dom';
import logo from "../Product/logo512.png";

const Cart = ({ addItemToCart, cartItems, removeItemFromCart }) => {
    const navigate = useNavigate();

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        addItemToCart(id, newQty);
    };

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) {
            // If the new quantity is zero, remove the item from the cart
            removeItemFromCart(id);
        } else {
            addItemToCart(id, newQty);
        }
    };

    const removeCartItemHandler = (id) => {
        removeItemFromCart(id);
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    // Save cart items to localStorage (You can modify this part as needed)
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    return (
        <Fragment>
            <MetaData title={'Your Cart'} />
            {cartItems.length === 0 ? (
                <h2 className="mt-5">Your Cart is Empty</h2>
            ) : (
                <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.product}>
                                <div className="border p-4 rounded-lg">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2">
                                            <img
                                                src={logo}
                                                alt="Laptop"
                                                className="w-24 h-24 object-cover"
                                            />
                                        </div>
                                        <div className="col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3">
                                            <Link to={`/products/${item.product}`} className="font-bold text-blue-600 hover:underline">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="col-span-12 sm:col-span-3 md:col-span-2 lg:col-span-2">
                                            <p id="card_item_price" className="text-xl font-bold text-gray-800">
                                                ${item.price}
                                            </p>
                                        </div>
                                        <div className="col-span-12 sm:col-span-3 md:col-span-2 lg:col-span-2">
                                            <div className="flex items-center">
                                                <button
                                                    className="btn btn-danger minus"
                                                    onClick={() => decreaseQty(item.product, item.quantity)}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    className="btn count w-12 text-center text-black"
                                                    value={item.quantity}
                                                    readOnly
                                                />
                                                <button
                                                    className="btn btn-primary plus"
                                                    onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-span-12 sm:col-span-1 md:col-span-1 lg:col-span-1">
                                            <i
                                                id="delete_cart_item"
                                                className="fa fa-trash btn btn-danger cursor-pointer"
                                                onClick={() => removeCartItemHandler(item.product)}
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="p-4 border rounded-lg">
                            <h4 className="text-xl font-bold mb-4">Order Summary</h4>
                            <p>
                                Subtotal: <span className="font-bold">{cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} (Units)</span>
                            </p>
                            <p>
                                Est. total: <span className="font-bold">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
                            </p>
                            <button
                                id="checkout_btn"
                                className="btn btn-primary btn-block mt-4"
                                onClick={checkoutHandler}
                            >
                                Check out
                            </button>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;
