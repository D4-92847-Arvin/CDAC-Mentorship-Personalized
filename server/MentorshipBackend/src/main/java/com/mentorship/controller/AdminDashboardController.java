package com.mentorship.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mentorship.dtos.ActivityStreakDto;
import com.mentorship.dtos.AdminOverviewDto;
import com.mentorship.dtos.ChurnReasonDto;
import com.mentorship.dtos.MentorLeaderboardDto;
import com.mentorship.dtos.MonthlyRevenueDto;
import com.mentorship.dtos.PendingVerificationDto;
import com.mentorship.dtos.RecentActivityDto;
import com.mentorship.dtos.RetentionChurnDto;
import com.mentorship.dtos.RevenueStatsDto;
import com.mentorship.dtos.UserManagementDto;
import com.mentorship.service.AdminDashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class AdminDashboardController {
    
    private final AdminDashboardService adminDashboardService;
    
    // ==================== OVERVIEW ====================
    
    @GetMapping("/overview")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminOverviewDto> getOverviewStats() {
        return ResponseEntity.ok(adminDashboardService.getOverviewStats());
    }
    
    @GetMapping("/recent-activity")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<RecentActivityDto>> getRecentActivity() {
        List<RecentActivityDto> activities = List.of(
            new RecentActivityDto("MENTOR_APPROVED", "New mentor approved", 
                "Dr. Sarah Mitchell joined", "Dr. Sarah Mitchell", "2h ago"),
            new RecentActivityDto("STUDENT_REGISTERED", "15 new student registrations", 
                "Today's signups", "System", "5h ago"),
            new RecentActivityDto("REVENUE_MILESTONE", "Revenue milestone reached", 
                "₹40K monthly revenue", "System", "1d ago")
        );
        return ResponseEntity.ok(activities);
    }
    
    // ==================== USER MANAGEMENT ====================
    
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserManagementDto>> getAllUsers() {
        return ResponseEntity.ok(adminDashboardService.getAllUsers());
    }
    
    @GetMapping("/users/filter")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserManagementDto>> getUsersByRole(@RequestParam String role) {
        return ResponseEntity.ok(adminDashboardService.getUsersByRole(role));
    }
    
    @GetMapping("/users/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> getUserStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", adminDashboardService.getTotalUsers());
        stats.put("activeUsers", adminDashboardService.getActiveUsers());
        stats.put("newThisMonth", adminDashboardService.getNewUsersThisMonth());
        return ResponseEntity.ok(stats);
    }
    
    @PutMapping("/users/{userId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> updateUserStatus(
            @PathVariable Long userId,
            @RequestParam String status) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "User status updated successfully");
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long userId) {
        try {
            adminDashboardService.deleteUser(userId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // ==================== VERIFICATION ====================
    
    @GetMapping("/verifications/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PendingVerificationDto>> getPendingVerifications() {
        return ResponseEntity.ok(adminDashboardService.getPendingVerifications());
    }
    
    @PostMapping("/verifications/{mentorId}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> approveMentor(@PathVariable Long mentorId) {
        adminDashboardService.approveMentorVerification(mentorId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Mentor verified successfully");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/verifications/{mentorId}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> rejectMentor(@PathVariable Long mentorId) {
        adminDashboardService.rejectMentorVerification(mentorId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Mentor rejected successfully");
        return ResponseEntity.ok(response);
    }
    
    // ==================== REVENUE ====================
    
    @GetMapping("/revenue/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RevenueStatsDto> getRevenueStats() {
        return ResponseEntity.ok(adminDashboardService.getRevenueStats());
    }
    
    @GetMapping("/revenue/monthly")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MonthlyRevenueDto>> getMonthlyRevenue() {
        return ResponseEntity.ok(adminDashboardService.getMonthlyRevenueData());
    }
    
    // ==================== RETENTION & CHURN ====================
    
    @GetMapping("/retention-churn/metrics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RetentionChurnDto> getRetentionChurnMetrics() {
        return ResponseEntity.ok(adminDashboardService.getRetentionChurnMetrics());
    }
    
    @GetMapping("/retention-churn/reasons")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ChurnReasonDto>> getChurnReasons() {
        return ResponseEntity.ok(adminDashboardService.getChurnReasons());
    }
    
    // ==================== LEADERBOARDS ====================
    
    @GetMapping("/leaderboards/mentors")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MentorLeaderboardDto>> getTopMentors(
            @RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(adminDashboardService.getTopMentorsByRating(limit));
    }
    
    @GetMapping("/leaderboards/activity-streak")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ActivityStreakDto>> getLongestActivityStreaks(
            @RequestParam(defaultValue = "4") int limit) {
        return ResponseEntity.ok(adminDashboardService.getLongestActivityStreaks(limit));
    }
    
    // ==================== PLATFORM GROWTH ====================
    
    @GetMapping("/growth/platform")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getPlatformGrowthData() {
        List<Map<String, Object>> growthData = List.of(
            createGrowthData("Apr", 150, 50),
            createGrowthData("May", 180, 65),
            createGrowthData("Jun", 280, 95),
            createGrowthData("Jul", 450, 145),
            createGrowthData("Aug", 520, 180),
            createGrowthData("Sep", 820, 220)
        );
        return ResponseEntity.ok(growthData);
    }
    
    // ==================== COHORT ANALYSIS ====================
    
    @GetMapping("/cohorts/retention")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getCohortRetentionAnalysis() {
        List<Map<String, Object>> cohortData = List.of(
            createCohortData("Jan 2024", "100%", "85%", "72%", "68%"),
            createCohortData("Feb 2024", "100%", "88%", "75%", "70%"),
            createCohortData("Mar 2024", "100%", "90%", "78%", "72%"),
            createCohortData("Apr 2024", "100%", "92%", "80%", null)
        );
        return ResponseEntity.ok(cohortData);
    }
    
    // ==================== HELPER METHODS ====================
    
    private Map<String, Object> createGrowthData(String month, double students, double mentors) {
        Map<String, Object> data = new HashMap<>();
        data.put("month", month);
        data.put("students", students);
        data.put("mentors", mentors);
        return data;
    }
    
    private Map<String, Object> createCohortData(String cohort, String month1, 
                                                   String month2, String month3, String month4) {
        Map<String, Object> data = new HashMap<>();
        data.put("cohort", cohort);
        data.put("month1", month1);
        data.put("month2", month2);
        data.put("month3", month3);
        data.put("month4", month4);
        return data;
    }
}
