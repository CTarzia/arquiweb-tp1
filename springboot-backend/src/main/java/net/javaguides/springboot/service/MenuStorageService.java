package net.javaguides.springboot.service;


import net.javaguides.springboot.model.Menu;
import net.javaguides.springboot.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;

@Service
public class MenuStorageService {

    @Autowired
    private MenuRepository menuRepository;

    public Menu store(Long restaurantId, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Menu Menu = new Menu(restaurantId, fileName, file.getContentType(), file.getBytes());

        return menuRepository.save(Menu);
    }

    public Menu getFile(Long id) {
        return menuRepository.findById(id).get();
    }

    public void deleteFile(Long id) {
        menuRepository.deleteById(id);
    }

    public Stream<Menu> getAllFiles() {
        return menuRepository.findAll().stream();
    }
}
