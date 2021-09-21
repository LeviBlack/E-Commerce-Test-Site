import React, {useState, useEffect} from 'react'
import {commerce} from './lib/commerce';
import {Products, Navbar, Cart} from './components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchProducts = async () => {
        const {data} = await commerce.products.list()

        setProducts(data) 
    }

    const fetchCart = async () => {
       const cart = await commerce.cart.retrieve()
       
        setCart(cart)
    }

    const handleAddToCart = async (productsId, quantity) => {
        const {cart} = await commerce.cart.add(productsId, quantity)
        
        setCart(cart)
    }

    const handleUpdateCartQty = async (productsId, quantity) => {
        const {cart} = await commerce.cart.update(productsId, {quantity})
    
        setCart(cart)
    }

    const handleRemoveFromCart = async (productsId) => {
        const {cart} = await commerce.cart.remove(productsId)

        setCart(cart)
    }


    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty()

        setCart(cart)
    }
    
    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    
    return (
        <Router>
            <div>   
                <Navbar totalItems={cart.total_items}/>
                    <Switch>
                        <Route exact path='/'>
                            <Products products={products} onAddToCart={handleAddToCart}/>
                        </Route>
                        <Route exact path='/cart'>
                            <Cart 
                                cart={cart}
                                handleUpdateCartQty={handleUpdateCartQty}
                                handleRemoveFromCart={handleRemoveFromCart}
                                handleEmptyCart={handleEmptyCart}

                            /> 
                        </Route>
                    </Switch>
            </div>
        </Router>
    )
}

export default App
