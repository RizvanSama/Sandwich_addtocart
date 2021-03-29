import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const useOrders = () => {

    const [items, setItems] = useState([]);
    const id = uuidv4();
    const [name, setName] = useState('');
    const [burger, setBurger] = useState('');
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [menuItems,setData]=useState([]);
 
    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('items'));
      if (items) {
        setItems(items);
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('items', JSON.stringify(items));
    }, [items]);


  
  
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
  
     
    
   

    return [id, items, name, burger, cart, cartTotal, menuItems];
};

export default useOrders;