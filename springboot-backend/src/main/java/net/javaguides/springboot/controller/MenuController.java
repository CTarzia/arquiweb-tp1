package net.javaguides.springboot.controller;

import net.javaguides.springboot.message.MenuResponseMessage;
import net.javaguides.springboot.model.Menu;
import net.javaguides.springboot.service.MenuStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/carta/")
public class MenuController {

  @Autowired
  private MenuStorageService storageService;

  @PostMapping("/{restaurantId}")
  public ResponseEntity<MenuResponseMessage> uploadMenu(@PathVariable Long restaurantId, @RequestParam("file") MultipartFile file) {
    String message = "";
    try {
      storageService.store(restaurantId, file);

      message = "Uploaded the file successfully: " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(new MenuResponseMessage(message));
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MenuResponseMessage(message));
    }
  }

  @GetMapping("/{restaurantId}")
  public ResponseEntity<byte[]> getFile(@PathVariable Long restaurantId) {
    Menu menu = storageService.getFile(restaurantId);

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + menu.getName() + "\"")
        .body(menu.getData());
  }

  @PutMapping("/{restaurantId}")
  public ResponseEntity<MenuResponseMessage> replaceMenu(@PathVariable Long restaurantId, @RequestParam("file") MultipartFile file) {
    String message = "";
    try {
      storageService.deleteFile(restaurantId);
      storageService.store(restaurantId, file);

      message = "Uploaded the file successfully: " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(new MenuResponseMessage(message));
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MenuResponseMessage(message));
    }
  }

}