import React from 'react';

const Sort = ({ sortChoice, handleChange}) => {
    return(
        <div>
            <select value={sortChoice} onChange={handleChange}>
                <option value={"Amount"}>Amount</option>
                <option value={"Alphabetically"}>Alphabetically</option>
            </select>
        </div>
    )
}

export default Sort