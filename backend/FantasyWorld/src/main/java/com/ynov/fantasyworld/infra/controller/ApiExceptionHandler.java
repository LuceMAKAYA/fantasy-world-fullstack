package com.ynov.fantasyworld.infra.controller;

import com.ynov.fantasyworld.services.LogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ApiExceptionHandler {

    private final LogService logService;

    public ApiExceptionHandler(LogService logService) {
        this.logService = logService;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        FieldError::getDefaultMessage,
                        (a, b) -> a
                ));

        logService.warn("Validation échouée", Map.of(
                "errors", errors
        ));

        ProblemDetail problem = ProblemDetail
                .forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle("Requête invalide");
        problem.setDetail("Un ou plusieurs champs sont invalides");
        problem.setProperty("errors", errors);
        return problem;
    }

    // Gère les 401 - Non authentifié
    @ExceptionHandler(AuthenticationException.class)
    public ProblemDetail handleAuthentication(AuthenticationException ex) {
        logService.warn("Accès non authentifié", Map.of(
                "message", ex.getMessage() != null ? ex.getMessage() : "inconnu"
        ));
        ProblemDetail problem = ProblemDetail
                .forStatus(HttpStatus.UNAUTHORIZED);
        problem.setTitle("Non authentifié");
        problem.setDetail("Vous devez être connecté pour accéder à cette ressource");
        return problem;
    }

    // Gère les 403 - Accès refusé
    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDenied(AccessDeniedException ex) {
        logService.warn("Accès refusé", Map.of(
                "message", ex.getMessage() != null ? ex.getMessage() : "inconnu"
        ));
        ProblemDetail problem = ProblemDetail
                .forStatus(HttpStatus.FORBIDDEN);
        problem.setTitle("Accès refusé");
        problem.setDetail("Vous n'avez pas les droits pour effectuer cette action");
        return problem;
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ProblemDetail handleResponseStatus(
            ResponseStatusException ex) {

        logService.warn("Erreur cliente", Map.of(
                "status", ex.getStatusCode().value(),
                "reason", ex.getReason() != null ? ex.getReason() : "inconnu"
        ));

        ProblemDetail problem = ProblemDetail
                .forStatus(ex.getStatusCode());
        problem.setTitle("Erreur");
        problem.setDetail(ex.getReason());
        return problem;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail handleIllegalArgument(
            IllegalArgumentException ex) {

        logService.warn("Argument invalide", Map.of(
                "message", ex.getMessage()
        ));

        ProblemDetail problem = ProblemDetail
                .forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle("Données invalides");
        problem.setDetail(ex.getMessage());
        return problem;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleException(Exception ex) {

        logService.error("Erreur inattendue", Map.of(
                "message", ex.getMessage() != null ? ex.getMessage() : "inconnu"
        ));

        ProblemDetail problem = ProblemDetail
                .forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        problem.setTitle("Erreur serveur");
        problem.setDetail("Une erreur inattendue s'est produite");
        return problem;
    }
}