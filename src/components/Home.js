import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./style.css";
import Orders from './Orders';

const Home = () => {
  const id = uuidv4();
  const [name, setName] = useState('');
  const [burger, setBurger] = useState('');
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [menuItems,setData]=useState([]);


const getData=()=>{
    fetch("../data.json"
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        //console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson["menu"]);
        setData(myJson["menu"]);
      });
  }
  useEffect(()=>{
    getData()
  },[])

  useEffect(() => {
    total();
    menuName();
  }, [cart]);

  const [items, setItems] = useState([]);
 
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);


  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
      //console.log(totalVal);
    }
    setCartTotal(totalVal);

  };

  const menuName = () => {
    let allItemName = '';
    for (let i = 0; i < cart.length; i++) {
      allItemName = cart[i].sandwichName;
      console.log(allItemName);
    }
    setBurger(allItemName);
  };

  const handleName = event => {
    setName(event.target.value)
  }

  const addToCart = (el) => {
    const newCart = { id, sandwichName: el.name, price: el.price};
      setCart([...cart, newCart]);
      console.log(cart);
   };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  const listItems = menuItems.map((el) => (
    <div key={el.id}>
      {`${el.name}: $${el.price}`}
      <input type="submit" value="add" onClick={() => addToCart(el)} />
    </div>
  ));

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      {`${el.sandwichName}: $${el.price}`}
      <input type="submit" value="remove" onClick={() => removeFromCart(el)} />
    </div>
  ));

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newTodo = { id, userName: name, burgerName: burger, total: cartTotal};
    setName('');
    if(name !== ''){
      setItems([...items, newTodo]);
    }
    
  };

  // const orderDisplay = items.map((item) => (
  //   <div key={item.id}>
  //     {`${item.userName}: ${item.burgerName}: $${item.total}`}
  //   </div>
  // ));

  return (
    <React.Fragment>
    <div>
    <div className="mainHome">
    <form onSubmit={handleSubmitForm}>
    <div>
    <div className="title-base">
        <h2>Our menu</h2>
    </div>
      <div>
      <table className="styled-table">
      <thead>
        <tr>
          <th>Sandwich Name</th>
          <th>Sandwich Price</th>
          <th> Add to Cart</th>
        </tr>
      </thead>
      <tbody>
      {menuItems.map((el) => (
        <tr key={el.id}>
          <td className="menuName">{el.name}</td>
          <td className="menuName">{el.price}</td>
          <td><input className="addCart" type="submit" value="+" onClick={() => addToCart(el)} /></td>
        </tr>
        ))}
      </tbody>
    </table>
      </div>
      <div className="title-base">
        <h2>Your Cart</h2>
    </div>
    <div>
      <table className="styled-table-order">
      <thead>
        <tr>
          <th>Sandwich Name</th>
          <th>Sandwich Price</th>
          <th>Remove from Cart</th>
        </tr>
      </thead>
      <tbody>
      {cart.map((el) => (
        <tr key={el.id}>
          <td className="menuName">{el.sandwichName}</td>
          <td className="menuName">{el.price}</td>
          <td><input className="removeCart" type="submit" value="-" onClick={() => removeFromCart(el)} /></td>
        </tr>
        ))}
      </tbody>
    </table>
      </div>
      <div className="title-base">
        <h2>Order Detail</h2>
    </div>
      <div className="confirmDetal">
        <div className='form-group'>
          Enter your Name: <input
          type='text'
          name='name'
          className='form-control interinput'
          placeholder='ENTER ITEM'
          value={name}
          onChange={handleName}
        />
        <div>Total: ${cartTotal}</div>
      </div>
       <button className='add-btn'>Confirm Order</button>
    </div>
    </div>
    </form>
    </div>
    <Orders items = {items} />
    </div>
   </React.Fragment>
  );
};

export default Home;