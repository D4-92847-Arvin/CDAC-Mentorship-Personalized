package com.mentorship.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentorship.dtos.ApiResponseDTO;
import com.mentorship.service.DataMigrationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/migration")
@RequiredArgsConstructor
public class DataMigrationController {

    private static final Logger logger = LoggerFactory.getLogger(DataMigrationController.class);
    private final DataMigrationService migrationService;

    /**
     * Migrate existing session_payments to transactions table
     * This is a one-time operation to sync historical payment data
     */
    @PostMapping("/session-payments-to-transactions")
    public ResponseEntity<ApiResponseDTO<String>> migrateSessionPaymentsToTransactions() {
        logger.info("POST /api/admin/migration/session-payments-to-transactions - Starting migration");
        try {
            migrationService.migrateSessionPaymentsToTransactions();
            String message = "Migration completed successfully";
            logger.info(message);
            return ResponseEntity.ok(ApiResponseDTO.success(message));
        } catch (Exception e) {
            logger.error("Error during migration: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(ApiResponseDTO.error("Migration failed: " + e.getMessage()));
        }
    }
}
