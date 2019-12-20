package org.fr.benissaecommerce.controller;

import org.fr.benissaecommerce.model.User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;

/**
 * Created by Montassar.MEJRI on 16/12/2019.
 */
@RestController
@RequestMapping("/login")
@CrossOrigin
public class UserController {

    @PostMapping
    public boolean login(@RequestBody User user) {
        return user.getUserName().equals("user") && user.getPassword().equals("password");
    }

    @GetMapping
    public Principal user(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization")
                .substring("Bearer".length()).trim();
        System.out.println("authToken : "+authToken);
        return () ->  new String(Base64.getDecoder()
                .decode(authToken)).split(":")[0];
    }
}
