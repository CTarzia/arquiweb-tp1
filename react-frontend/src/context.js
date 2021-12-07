import { createContext } from "react";

export const UserContext = createContext({
	userId: null,
	setUserId: () => {},
	userName: () => {},
	setUserName: () => {},
	restaurantId: null,
	setRestaurantId: () => {},
	restaurant: {},
	setRestaurant: () => {},
});
