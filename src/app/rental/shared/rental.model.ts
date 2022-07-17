export class Rental {
  _id: string; // unnique identifier for the rental will be stored in DB
  title: string;
  city: string;
  street: string;
  category: string;
  image: string;
  numOfRooms: number;
  description: string;
  dailyPrice: number;
  shared: boolean;
  createdAt: string; //  23/12/2000
}
