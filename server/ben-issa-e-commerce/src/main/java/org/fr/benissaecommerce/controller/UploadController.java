package org.fr.benissaecommerce.controller;

import org.fr.benissaecommerce.model.Product;
import org.fr.benissaecommerce.service.ProductService;
import org.fr.benissaecommerce.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import org.springframework.core.io.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Montassar.MEJRI on 08/11/2019.
 */

@Controller
@RequestMapping("/api/files")
public class UploadController {

    @Autowired
    StorageService storageService;
    @Autowired
    ProductService productService;

    String files = new String();

    @PostMapping("/{id}")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,@PathVariable(value = "id") Long id) {
        String message = "";
        try {
            storageService.store(file);
            message = "You successfully uploaded " + file.getOriginalFilename() + "!";
            String fileUrl = MvcUriComponentsBuilder.fromMethodName(UploadController.class, "getFile", file.getOriginalFilename()).build().toString();
            Product product = productService.getProduct(id);
            product.setPictureUrl(fileUrl);
            productService.save(product);
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "FAIL to upload " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    @GetMapping("/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}
