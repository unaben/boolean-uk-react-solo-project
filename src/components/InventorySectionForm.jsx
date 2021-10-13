import React from "react";
import { useState } from "react";

const InventorySectionForm = (props) => {
  const { listings, setListings } = props;

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

  console.log("Inside CreateInventoryForm State: ", {
    listing: {
      title,
      description,
      price: parseInt(price, 10),
      soldVehicle,
      image,
    },
    cars: { model, make, color, year: parseInt(year, 10) },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const carsToCreate = {
      make,
      model,
      color,
      year: parseInt(year, 10),
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carsToCreate),
    };
    fetch(" http://localhost:3030/cars", fetchOptions)
      .then((res) => res.json())
      .then((newCarData) => {
        console.log("Car Data TO POST: ", { newCarData });

        const listingToCreate = {
          title,
          description,
          price: parseInt(price, 10),
          soldVehicle,
          image,
          carId: newCarData.id,
        };
        console.log("listing to create: ", listingToCreate);

        const fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listingToCreate),
        };

        fetch("http://localhost:3030/listings", fetchOptions)
          .then((res) => res.json())
          .then((newlisting) => {
            console.log("List to create: ", newlisting);

            const carToAdd = {
              ...newlisting,
              car: newCarData,
            };
            console.log("Car to add: ", carToAdd);
            setListings([...listings, carToAdd]);
          });
      });
  };
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
    <aside className="inventory-section box">
      <form className="" onSubmit={handleSubmit}>
        <h1>Inventory Section</h1>
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
              Create
            </button>
          </div>
          <button className="form-label btn" type="reset">
            Reset
          </button>
        </div>
      </form>
    </aside>
  );
};

export default InventorySectionForm;
