import React from 'react';

const Form = ({
  name,
  column,
  orderPickup,
  isChecked,
  handleOrderPickup,
  handleName,
  handleColumn,
  handleSubmitForm,
  menuItems,
  cartItems,
  listItems,
  cartTotal,
  menuName,
  handleMenuName
}) => (
    
<div className='grid-item form-main'>
  <form onSubmit={handleSubmitForm}>
        <div className='form-group'>
          <input
          type='text'
          name='name'
          className='form-control interinput'
          placeholder='ENTER ITEM'
          value={name}
          onChange={handleName}
        />
        </div>
        <div className='form-group'>
        <select value={column} onChange={handleColumn}>
            {menuItems.map((menuItem) => (
              <option value={menuItem.name}>{menuItem.name}-{menuItem.price}</option>
            ))}
          </select>
        </div>
        <div>Menu:</div>
        <div>
          <table>
            <thead className="thead-main">
              <tr>
                <th className="th-title">Sandwich Name</th>
                <th className="th-title">Sandwich Pice</th>
              </tr>
            </thead>
            <tbody>
            {menuItems.map((menuItem) => (
              <tr>
                <td name='menuName' value={menuName}  onChange={handleMenuName}>{menuItem.name}</td>
                <td name='menuName' value={menuName}>{menuItem.price}</td>
              </tr>
            ))}
            </tbody>
            <tr></tr>
          </table>
        </div>
        <div>{listItems}</div>
        <label>
            <p>Pick-up</p>
                <input
                      type="checkbox"
                      value={orderPickup}
                      checked={isChecked}
                      onChange={handleOrderPickup}
                  />
        </label>
        <div>Order</div>
        <div>{cartItems}</div>
        <div>Total: ${cartTotal}</div>
        <button className='form-control add-btn'>ADD ITEM</button>
        </form>
 </div>
)

export default Form