package com.foodreviewer.backend.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import org.slf4j.Logger;


@Aspect
@Component
public class LoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    @Pointcut("Execution(*com.foodreviewer.backend.controllers.*.*(..))")
    public void controllerPointcut(){
    }

    @Around("controllerPointcut()")
    public Object logControllerMethod(ProceedingJoinPoint joinPoint) throws Throwable {
        String nomeMetodo = joinPoint.getSignature().getName();
        String nomeClasse = joinPoint.getTarget().getClass().getSimpleName();
        Object[] args = joinPoint.getArgs();

        log.info("Entrando: {}.{}() com argumentos: {}", nomeClasse, nomeMetodo, Arrays.toString(args));

        long tempoInicio = System.currentTimeMillis();

        Object resultado = joinPoint.proceed();

        long tempoTotal = System.currentTimeMillis() - tempoInicio;

        log.info("Saindo: {}.{}() com resultado: {}. Tempo de execução {}ms", nomeClasse, nomeMetodo, resultado, tempoTotal);

        return resultado;
    }
}
