package springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot.exception.ResourceNotFoundException;
import springboot.model.Order;
import springboot.model.Restaurant;
import springboot.repository.OrderRepository;
import springboot.repository.RestaurantRepository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/restaurantes/")
public class RestuarantController {

	@Autowired
	private RestaurantRepository restaurantRepository;

	@Autowired
	private OrderRepository orderRepository;

	@GetMapping("/")
	public List<Restaurant> getAllRestaurants(){
		return restaurantRepository.findAll();
	}

	@PutMapping("/{id}")
	public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurantDetails){
		Restaurant restaurant = restaurantRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant not exist with id :" + id));

		restaurant.setLatitude(restaurantDetails.getLatitude());
		restaurant.setLongitude(restaurantDetails.getLongitude());
		restaurant.setName(restaurantDetails.getName());
		restaurant.setWorkingHours(restaurantDetails.getWorkingHours());

		Restaurant updatedRestaurant = restaurantRepository.save(restaurant);
		return ResponseEntity.ok(updatedRestaurant);
	}

	@GetMapping("/{restoId}/pedidos")
	public ResponseEntity<List<Order>> getRestaurantOrders(@PathVariable Long restoId) {
		List<Order> orders = orderRepository.findAll().stream()
				.filter(order -> Objects.equals(order.getRestoId(), restoId))
				.collect(Collectors.toList());
		return ResponseEntity.ok(orders);
	}
	
}
