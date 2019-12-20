package org.fr.benissaecommerce.security_configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by Montassar.MEJRI on 16/12/2019.
 */
@Configuration
@EnableWebSecurity
public class BasicAuthConfiguration
        extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("user")
                .password("password")
                .roles("USER");
    }

    @Override
    protected void configure(HttpSecurity http)
            throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/**").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }

//    Dans la section II-B de notre article, nous avions identifié quatre domaines fonctionnels
//    pour notre application de gestion de la bibliothèque : Book, Customer, Loan et Category.
//    Nous avons aussi fait le choix d'utiliser une architecture d'organisation du projet de type
//    package by feauture. Pour rappel, cette architecture se distingue de l'architecture n-tiers (
//
//
//    très répandue) par le fait qu'elle prescrit la mise de toutes classes Java d'un domaine fonctionnel
//    au même niveau dans le package dédié, contrastant ainsi avec une organisation en couches. Au terme de
//    notre développement, notre projet library devra ressembler à la figure ci-dessous et cela représente notre objectif.
}

