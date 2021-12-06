export const ROUTES = {
	WELCOME_TABLE: "/restaurante/:restoId/:tableId/welcomeTable",
	ORDER_STATUS: "/estado_del_pedido",
	CREATE_ORDER: "/restaurante/:id/hacer_pedido",
	CURRENT_ORDERS: "/restaurante/:id/pedidos_en_curso",
	PENDING_ORDERS: "/restaurante/:id/pedidos_pendientes",
	MENU: "/menu/:restoId",
	HOME: "/", // Listo
	NEARBY_RESTAURANTS: "/restaurantes_cercanos",
	LOGIN: "/login",
	SIGN_UP: "/signup",
	BACKOFFICE_HOME: "/backoffice",
	RESTAURANT_MANAGMENT: "/restaurante",
	ORDERS_MANAGEMENT: "/pedidos",
	TABLE_STATUS: "/backoffice/:id/mesas",
};

export const PRIVATE_ROUTES = [
	ROUTES.BACKOFFICE_HOME,
	ROUTES.RESTAURANT_MANAGMENT,
	ROUTES.ORDERS_MANAGEMENT,
	ROUTES.TABLE_STATUS,
];
