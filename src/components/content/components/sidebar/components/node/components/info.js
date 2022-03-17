import React from "react";

function NodeInfo({ node: { id, text: label, isGrounded }, handleChange }) {
  return (
    <>
      <p>Id: {id}</p>
      <label htmlFor="text">Name:</label>
      <input
        value={label}
        name="text"
        data-action="PROPERTY_CHANGE"
        onChange={handleChange}
      />
      <label htmlFor="isGrounded">Grounded:</label>
      <input
        type="checkbox"
        checked={isGrounded}
        name="isGrounded"
        data-action="PROPERTY_CHANGE"
        onChange={handleChange}
      />
    </>
  );
}

export default NodeInfo;
