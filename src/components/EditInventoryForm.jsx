import React, { useState, useEffect } from "react";

const EditInventoryForm = (props) => {
  const { listings, setListings, listingToEdit } = props;

  console.log("Inside EditInventoryForm: ", listingToEdit);

  // listing
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [soldVehicle, setSoldVehicle] = useState(false);
  const [image, setImage] = useState("");
  // cars
  const [model, setModel] = useState("");
  const [make, setMake] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");

  console.log("Inside EditInventoryForm State: ", {
    listing: {
      title,
      description,
      price: parseInt(price, 10),
      soldVehicle,
      image,
    },
    cars: { model, make, color, year: parseInt(year, 10) },
  });

  useEffect(() => {
    if (listingToEdit) {
      const { title, description, price, soldVehicle, image, car } =
        listingToEdit;

      const { model, make, color, year } = car;

      setTitle(title);
      setDescription(description);
      setPrice(price);
      setSoldVehicle(soldVehicle);
      setImage(image);
      setModel(model);
      setMake(make);
      setColor(color);
      setYear(year);
    }
  }, [listingToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("here");
  event.target.reset()

    const carToEditId = listingToEdit.car.id;

    const carsToUpdate = {
      model,
      make,
      color,
      year: parseInt(year, 10),
    };

    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carsToUpdate),
    };

    fetch(`http://localhost:3030/cars/${carToEditId}`, fetchOptions)
      .then((res) => res.json())
      .then((updatedCar) => {
        console.log("cars PATCH request: ", updatedCar);

        const listingToUpdate = {
          title,
          description,
          price: parseInt(price, 10),
          soldVehicle,
          image,
          carId: listingToEdit.carsId,
        };

        const fetchOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listingToUpdate),
        };

        fetch(
          `http://localhost:3030/listings/${listingToEdit.id}`,
          fetchOptions
        )
          .then((res) => res.json())
          .then((updatedList) => {
            console.log("Listings PATCH request: ", updatedList);

            const updatedListings = listings.map((listing) => {
              if (listing.id === updatedList.id) {
                return {
                  ...updatedList,
                  car: {
                    ...updatedCar,
                  },
                };
              }
              return listing;
            });

            setListings(updatedListings);
          });
      });
  };
  

const handleRemoveItem = (event, id) => {     
 event.preventDefault()
fetch(`http://localhost:3030/listings/${listingToEdit.id}`, { method: 'DELETE' })
.then(() => console.log('Delete successful'));

fetch(`http://localhost:3030/listings/$${listingToEdit.car.id}`, { method: 'DELETE' })
.then(() => console.log('Delete successful'));
}

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleModel = (event) => {
    setModel(event.target.value);
  };
  const handleMake = (event) => {
    setMake(event.target.value);
  };
  const handleYear = (event) => {
    setYear(event.target.value);
  };
  const handleColor = (event) => {
    setColor(event.target.value);
  };
  const handleImage = (event) => {
    setImage(event.target.value);
  };
  const handleCheckBox = (event) => {
    setSoldVehicle(event.target.checked);
  };
  return (
    <div>
      <aside className="update-section box">
        <form className="" onSubmit={handleSubmit}>
          <h1>Update Section</h1>
          <div className="">
            <label for="title">Title:</label>
          </div>
          <input
            className="label-radius"
            id="title"
            name="title"
            type="text"
            placeholder="Enter vehicle title"
            onChange={handleTitle}
            value={title}
          />
          <div className="form-label">
            <label for="description">Description:</label>
          </div>
          <input
            className="label-radius"
            id="description"
            name="description"
            type="text"
            onChange={handleDescription}
            value={description}
          />
          <div className="form-label">
            <label for="price">Price:</label>
          </div>
          <input
            className="label-radius"
            id="price"
            name="price"
            type="text"
            onChange={handlePrice}
            value={price}
          />
          <div className="form-label">
            <label for="make">Make:</label>
          </div>
          <input
            className="label-radius"
            id="make"
            name="make"
            type="text"
            onChange={handleMake}
            value={make}
          />
          <div className="form-label">
            <label for="model">Model:</label>
          </div>
          <input
            className="label-radius"
            id="model"
            name="model"
            type="text"
            onChange={handleModel}
            value={model}
          />
          <div className="form-label">
            <label for="color">Color:</label>
          </div>
          <input
            className="label-radius"
            id="color"
            name="color"
            type="text"
            onChange={handleColor}
            value={color}
          />
          <div className="form-label">
            <label for="year">Year:</label>
          </div>
          <input
            className="label-radius"
            id="year"
            name="year"
            type="number"
            onChange={handleYear}
            value={year}
          />
          <div className="form-label">
            <label for="image">Vehicle Image:</label>
          </div>
          <input
            className="label-radius"
            id="image"
            name="image"
            type="url"
            onChange={handleImage}
            value={image}
          />
          <div className="form-label">
            <input
              id="sold-checkbox"
              name="sold-checkbox"
              type="checkbox"
              onChange={handleCheckBox}
              checked={soldVehicle}
            />
            <label for="checkbox">Sold</label>
          </div>
          <div className="auto-flow">
            <div>
              <button className="form-label btn" type="submit">
                Update
              </button>
            </div>
            <div>
              <button onClick={(e)=>handleRemoveItem(e, listingToEdit.id)} className="form-label btn" type="delete">              
                Delete
              </button>
            </div>
            <button className="form-label btn" 
            type="reset"            
            >
              Reset
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
};

export default EditInventoryForm;
