const mongoose = require("mongoose");

const image1Id = mongoose.Types.ObjectId();
const image2Id = mongoose.Types.ObjectId();
const image3Id = mongoose.Types.ObjectId();

const images = [
  {
    _id: image1Id,
    cloudinaryId: "francesca-tosolini-tHkJAMcO3QE-unsplash_atkqat",
    url: "https://res.cloudinary.com/dggqfqhaf/image/upload/v1659457280/francesca-tosolini-tHkJAMcO3QE-unsplash_atkqat.jpg",
  },
  {
    _id: image2Id,
    cloudinaryId: "deborah-cortelazzi-gREquCUXQLI-unsplash_vpz9hq",
    url: "https://res.cloudinary.com/dggqfqhaf/image/upload/v1659457266/deborah-cortelazzi-gREquCUXQLI-unsplash_vpz9hq.jpg",
  },
  {
    _id: image3Id,
    cloudinaryId: "patrick-perkins-3wylDrjxH-E-unsplash_wfoanz",
    url: "https://res.cloudinary.com/dggqfqhaf/image/upload/v1659457244/patrick-perkins-3wylDrjxH-E-unsplash_wfoanz.jpg",
  },
];

const rentals = [
  {
    title: "Nice view on ocean",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: image1Id,
    numOfRooms: 4,
    shared: true,
    description: "Very nice apartment in center of the city.",
    dailyPrice: 43,
    owner: mongoose.Types.ObjectId(),
  },
  {
    title: "Modern apartment in center",
    city: "New York",
    street: "Time Square",
    category: "apartment",
    image: image2Id,
    numOfRooms: 1,
    shared: false,
    description: "Very nice apartment in center of the city.",
    dailyPrice: 11,
    owner: mongoose.Types.ObjectId(),
  },
  {
    title: "Old house in nature",
    city: "Bratislava",
    street: "Letna 7",
    category: "house",
    image: image3Id,
    numOfRooms: 5,
    shared: true,
    description: "Very nice apartment in center of the city.",
    dailyPrice: 23,
    owner: mongoose.Types.ObjectId(),
  },
];

module.exports = { rentals, images };
