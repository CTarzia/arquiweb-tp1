export const ROUTES = {
	HOME: "/", // Listo
	LOGIN: "/login", // Listo
	SIGN_UP: "/signup", // Listo
	BACKOFFICE_HOME: "/backoffice", // Listo
	RESTAURANT_MANAGMENT: "/backoffice/restaurante", // Listo
	TABLE_MANAGEMENT: "/backoffice/mesas", // Listo
	ORDERS_MANAGEMENT: "/backoffice/pedidos",
	MENU: "/menu/:restoId", // Listo
	CREATE_ORDER: "/restaurante/:id/hacer_pedido", // Listo
	NEARBY_RESTAURANTS: "/restaurantes_cercanos", // Listo
	ORDER_STATUS: "/estado_del_pedido", // Listo

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
