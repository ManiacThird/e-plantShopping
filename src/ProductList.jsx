import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';
import { useDispatch, useSelector } from 'react-redux';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "$18"
                },
                {
                    name: "Boston Fern",
                    image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                    description: "Adds humidity to the air and removes toxins.",
                    cost: "$20"
                },
                {
                    name: "Rubber Plant",
                    image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                    description: "Easy to care for and effective at removing toxins.",
                    cost: "$17"
                },
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Purifies the air and has healing properties for skin.",
                    cost: "$14"
                }
            ]
        },
        // Agrega las demás categorías aquí si lo deseas...
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div>
                        <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <a href="#" onClick={handleCartClick} style={styleA}>
                            <h1 className='cart'>
                                🛒
                                <span style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 2,
                                    backgroundColor: 'red',
                                    borderRadius: '50%',
                                    padding: '2px 6px',
                                    color: 'white',
                                    fontSize: '14px'
                                }}>
                                    {calculateTotalQuantity()}
                                </span>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1><div>{category.category}</div></h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">{plant.cost}</div>
                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                            style={addedToCart[plant.name] ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {}}
                                        >
                                            {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
