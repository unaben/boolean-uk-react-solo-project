import React, { useState } from "react";

const CreatedStockSection = (props) => {
  const {
    listings,
    // hideInventoryForm,
    // setHideInventoryForm,
    setListingToEdit,
  } = props;

  const [selectedFilter, setSelectedFilter] = useState("");
  console.log("Inside Filter: ", selectedFilter);

  const handleFilterByTypeValue = (event) => {
    setSelectedFilter(event.target.value);
  };
  return (
    <>
      <header className="header-list">
        <h2>VEHICLES IN STOCK</h2>
        <div className="">
          {/* <button  className="btn" onClick={() => setHideInventoryForm(!hideInventoryForm)}>
            {hideInventoryForm ? "Create" : "Cancel"}
          </button> */}
          <div>
            <form id="filter-by-type-form" autocompete="off">
              <label for="filter-by-type"> Filter by color: </label>
              <select
                onChange={handleFilterByTypeValue}
                name="filter-by-type"
                id="filter-by-type"
                className="label-radius btn-filter"
              >
                <option value=""> Filter by color </option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="grey">Grey</option>
                <option value="silver">Silver</option>
                <option value="purple">Purple</option>
              </select>
            </form>
          </div>
        </div>
      </header>
      <ul>
        {listings
          .filter((listing) => {
            console.log("filter listings: ", listings);
            if (
              selectedFilter === listing.car.color.toLowerCase() ||
              selectedFilter === ""
            ) {
              return true;
            } else {
              return false;
            }
          })
          .map((listing, index) => {
            const { description, price, image, car } = listing;

            const { model, make, color, year } = car;

            console.log("image inside listing is: ", image);
            return (
              <li key={index} className="render-list">
                <div className="box">
                  <img src={image} alt="" />
                </div>
                <h2>
                  {make} {model}
                </h2>
                <h3> {description}</h3>
                <div className="auto-flow">
                  <div>
                    <h3>Color: {color}</h3>
                  </div>
                  <div>
                    <h3>Year: {year}</h3>
                  </div>
                  <h3>Value: £{price}</h3>
                </div>
                <button
                  className="btn"
                  onClick={() => setListingToEdit(listing)}
                >
                  Edit
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default CreatedStockSection;
