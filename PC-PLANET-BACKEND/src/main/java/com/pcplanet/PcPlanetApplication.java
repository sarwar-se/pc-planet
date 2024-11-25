package com.pcplanet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.pcplanet")
@EnableJpaRepositories("com.pcplanet.repository")
@EntityScan("com.pcplanet.entity")
public class PcPlanetApplication {
    public static void main(String[] args) {
        SpringApplication.run(PcPlanetApplication.class, args);
    }
}
