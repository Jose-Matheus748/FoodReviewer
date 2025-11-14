package com.foodreviewer.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class FoodReviewerApplication {
	public static void main(String[] args) {
		SpringApplication.run(FoodReviewerApplication.class, args);
	}

}
