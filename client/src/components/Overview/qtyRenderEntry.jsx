import React from 'react';

var qtyRenderEntry = function(props) {
  //run for-loop to display qty from 1 to current qty or max 15
  var qtyArray = [];
  for (var i = 1; i <= props.qty && i <= 15; i++) {
    qtyArray.push(i);
  }

  if (props.qty === "0") {
    return (
      <select>
        <option> - </option>
      </select>
    );

  } else {
    var selectInitial = 'Quantity';

    return (
      <select id="dropdown-qty" onChange ={props.handleSelectQty}>
        <option> {selectInitial}</option>
        {qtyArray.map((elm, i) => (<option key={i} value={elm}> {elm} </option>))}
      </select>
    );
  }
};

export default qtyRenderEntry;
