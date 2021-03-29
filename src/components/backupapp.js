import React, { useState, useEffect } from 'react';
import Form from './components/form';

import { v4 as uuidv4 } from 'uuid';

function App() {

  const id = uuidv4();
  const [name, setName] = useState('');
  const [column, setColumn] = useState('');
  const [menuName, setMenuName] = useState('');
  const [orderPickup, setOrderPickup] = useState('');
  const [allOrders, setAllOrders] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [displayOne, setDisplayOne] = useState([]);
  
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const addToCart = (el) => {
      setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  useEffect(() => {
    setAllOrders(JSON.parse(localStorage.getItem('localStorageAllOrders')) || []);
    setDisplayOne(JSON.parse(localStorage.getItem('localStorageAllOrders')) || []);
  }, []);

  const setLocalStorageOne = (dataSaveInLSOne) => {
    setAllOrders(dataSaveInLSOne);
    setDisplayOne(dataSaveInLSOne);
    localStorage.setItem('localStorageAllOrders', JSON.stringify(dataSaveInLSOne));
  };

  const handleName = event => {
    setName(event.target.value)
  }

  const handleColumn = event => {
    setColumn(event.target.value)
  }
  const handleMenuName = event => {
    setMenuName(event.target.value)
  }

  const handleOrderPickup = event => {
    setIsChecked(!isChecked);
    /*if(isChecked){
      setIsChecked('PickUp');
    }
    else{
      setIsChecked('Delivery');
    }*/

  }
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
        const newTodo = { id, itemName: name, select:column, pickup:isChecked, menu:menuName};
        const dataSaveInLSOne = [...allOrders, newTodo];
        setName('');
        setColumn('');
        setLocalStorageOne(dataSaveInLSOne);
  };

  const columnOneAll = () => setDisplayOne(allOrders);

  const listItems = menuItems.map((el) => (
    <div key={el.id}>
      {`${el.name}: $${el.price}`}
      <input type="submit" value="add" onClick={() => addToCart(el)} />
    </div>
  ));

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      {`${el.name}: $${el.price}`}
      <input type="submit" value="remove" onClick={() => removeFromCart(el)} />
    </div>
  ));
  

  const removeColoumnOne = (id) => {
    const dataSaveInLSOne = allOrders.filter((columnOne) => columnOne.id !== id);
    setLocalStorageOne(dataSaveInLSOne);
  };

  return (
    <React.Fragment>
      <div className='main-content'>
        <div className='mainWrap'>
          <div className='top-bar'>
            <h1>Marvelous!</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>
          </div>
          <div className='title'>
            <h5>ADD AN ITEM</h5>
          </div>
          <div className='grid-container'>
            <Form
              id={id}
              name={name}
              menuName={menuName}
              column={column}
              isChecked = {isChecked}
              orderPickup = {orderPickup}
              handleOrderPickup = {handleOrderPickup}
              handleName={handleName}
              handleColumn={handleColumn}
              handleSubmitForm={handleSubmitForm}
              handleMenuName = {handleMenuName}
              menuItems = {menuItems}
              listItems = {listItems}
              cartItems = {cartItems}
              cartTotal = {cartTotal}
            />
            <div className='grid-item table-wrap-main'>
              <div className="table-wrap">
              <table>
                <thead className="thead-main">
                  <tr>
                    <th className="th-title">All Oder</th>
                  </tr>
                </thead>
                <tbody className = 'main-table-body'>
                  {displayOne.map((columnOne) => (
                    <tr key={columnOne.id}>
                      <td className="item-text">{columnOne.itemName}</td>
                      <td className="item-text">{columnOne.select}</td>
                      <td className="btn-main"><button type='submit' onClick={()=>removeColoumnOne(columnOne.id)}>x</button></td>
                    </tr>
                  ))}
                  </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>
      </div>
      </React.Fragment>
  )
}

export default App