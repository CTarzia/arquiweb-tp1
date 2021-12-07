export const ROUTES = {
	HOME: "/", // Listo
	LOGIN: "/login", // Listo
	SIGN_UP: "/signup", // Listo
	BACKOFFICE_HOME: "/backoffice", // Listo
	RESTAURANT_MANAGMENT: "/backoffice/restaurante",
	ORDERS_MANAGEMENT: "/backoffice/pedidos",
	TABLE_STATUS: "/backoffice/mesas",

	WELCOME_TABLE: "/restaurante/:restoId/:tableId/welcomeTable",
	ORDER_STATUS: "/estado_del_pedido",
	CREATE_ORDER: "/restaurante/:id/hacer_pedido",
	CURRENT_ORDERS: "/restaurante/:id/pedidos_en_curso",
	PENDING_ORDERS: "/restaurante/:id/pedidos_pendientes",
	MENU: "/menu/:restoId",
	NEARBY_RESTAURANTS: "/restaurantes_cercanos",
};

export const PRIVATE_ROUTES = [
	ROUTES.BACKOFFICE_HOME,
	ROUTES.RESTAURANT_MANAGMENT,
	ROUTES.ORDERS_MANAGEMENT,
	ROUTES.TABLE_STATUS,
];
