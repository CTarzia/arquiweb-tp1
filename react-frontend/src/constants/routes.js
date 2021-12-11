export const ROUTES = {
	HOME: "/",
	LOGIN: "/login", 
	SIGN_UP: "/signup",
	BACKOFFICE_HOME: "/backoffice",
	RESTAURANT_MANAGMENT: "/backoffice/restaurante", 
	TABLE_MANAGEMENT: "/backoffice/mesas",
	ORDERS_MANAGEMENT: "/backoffice/pedidos",
	MENU: "/menu/:restoId", 
	CREATE_ORDER: "/restaurante/:id/hacer_pedido", 
	NEARBY_RESTAURANTS: "/restaurantes_cercanos", 
	ORDER_STATUS: "/estado_del_pedido", 

	WELCOME_TABLE: "/restaurante/:restoId/:tableId/welcomeTable",
	CURRENT_ORDERS: "/restaurante/:id/pedidos_en_curso",
	PENDING_ORDERS: "/restaurante/:id/pedidos_pendientes",
};

export const PRIVATE_ROUTES = [
	ROUTES.BACKOFFICE_HOME,
	ROUTES.RESTAURANT_MANAGMENT,
	ROUTES.ORDERS_MANAGEMENT,
	ROUTES.TABLE_MANAGEMENT,
];
