import React from "react";

const Orders = ({items}) => {

    // const orderDisplay = items.map((item) => (
    //   <div key={item.id}>
    //     {`${item.userName}: ${item.burgerName}: $${item.total}`}
    //   </div>
    // ));

    return (
      <React.Fragment>
        <h2>All Orders</h2>
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
      {items.map((item) => (
        <tr key={item.id}>
          <td className="menuName">{item.userName}</td>
          <td className="menuName">{item.burgerName}</td>
          <td className="menuName">{item.total}</td>
          {/* <td><input className="removeCart" type="submit" value="-" onClick={() => removeFromCart(el)} /></td> */}
        </tr>
        ))}
      </tbody>
    </table>
      </div>
      </React.Fragment>
    );
  }

  export default Orders;