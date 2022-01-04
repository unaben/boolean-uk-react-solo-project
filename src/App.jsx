import React, { useState, useEffect } from "react";
import InventorySectionForm from "./components/InventorySectionForm";
import CreatedStockSection from "./components/CreatedStockSection";
import "./Styles/index.css";
import EditInventoryForm from "./components/EditInventoryForm";


function App() {
  const [listings, setListings] = useState([]);
  // const [hideInventoryForm, setHideInventoryForm] = useState(true);
  const [listingToEdit, setListingToEdit] = useState(null);

  console.log("Inside state: ", listings);

  useEffect(() => {
    fetch("http://localhost:3030/listings")
      .then((res) => res.json())
      .then((listingData) => {
        console.log("Inside Fetch ListingData: ", { listingData });
        setListings(listingData);
      });
  }, []); 

  return (
    <>
    <div className="three-column-grid" >    
      {/* {!hideInventoryForm && ( */}
      {/* <InventorySectionForm listings={listings} setListings={setListings} /> */}
      {/* )} */}
      <div>
      <InventorySectionForm listings={listings} setListings={setListings} />
      </div>
      <div className="main-container" >
      <main className="create-stock-section scroll">
        <CreatedStockSection
          listings={listings}
          // hideInventoryForm={hideInventoryForm}
          // setHideInventoryForm={setHideInventoryForm}
          setListingToEdit={setListingToEdit}
        />
      </main>
      </div>
      <EditInventoryForm
        listings={listings}
        setListings={setListings}
        listingToEdit={listingToEdit}
      />
      </div> 
    </>
  );
}

export default App;
