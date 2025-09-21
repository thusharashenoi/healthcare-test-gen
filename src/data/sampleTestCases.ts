export const sampleTestCases: Record<string, any> = {
  "REQ-1": {
    "test_case_id": "TC-001",
    "req_id": "REQ-1",
    "title": "Verify 2FA login flow",
    "test_steps": [
      {"step": 1, "action": "Enter valid username and password", "expected": "Prompt for OTP"},
      {"step": 2, "action": "Enter valid OTP", "expected": "Login successful"},
      {"step": 3, "action": "Enter invalid OTP", "expected": "Login denied"}
    ],
    "expected_results": "System enforces OTP-based 2FA after credentials.",
    "data_profile": {
      "fields": [
        {"name": "username", "type": "string"},
        {"name": "otp", "type": "numeric"}
      ],
      "rows": 5,
      "note": "synthetic data"
    },
    "status": "pending_review"
  },
  "REQ-2": {
    "test_case_id": "TC-002",
    "req_id": "REQ-2",
    "title": "Verify MRN encryption at rest and in transit",
    "test_steps": [
      {"step": 1, "action": "Upload record with MRN", "expected": "Stored successfully"},
      {"step": 2, "action": "Check database storage", "expected": "MRN not in plaintext"},
      {"step": 3, "action": "Retrieve MRN over HTTPS", "expected": "Encrypted in transit"}
    ],
    "expected_results": "MRN is encrypted in DB and during API calls.",
    "data_profile": {
      "fields": [{"name": "MRN", "type": "string"}],
      "rows": 10,
      "note": "synthetic MRNs"
    },
    "status": "pending_review"
  },
  "REQ-3": {
    "test_case_id": "TC-003",
    "req_id": "REQ-3",
    "title": "Verify logging of access attempts",
    "test_steps": [
      {"step": 1, "action": "Attempt valid record access", "expected": "Access granted & log created"},
      {"step": 2, "action": "Attempt unauthorized record access", "expected": "Access denied & log created"}
    ],
    "expected_results": "Every attempt (success or failure) logged with timestamp & user ID.",
    "data_profile": {
      "fields": [
        {"name": "user_id", "type": "string"},
        {"name": "timestamp", "type": "datetime"}
      ],
      "rows": 5,
      "note": "synthetic"
    },
    "status": "pending_review"
  },
  "REQ-4": {
    "test_case_id": "TC-004",
    "req_id": "REQ-4",
    "title": "Verify role-based access for clinicians",
    "test_steps": [
      {"step": 1, "action": "Login as user with role 'Nurse'", "expected": "Denied access"},
      {"step": 2, "action": "Login as user with role 'Clinician'", "expected": "Access granted"}
    ],
    "expected_results": "Only clinicians can retrieve history.",
    "data_profile": {
      "fields": [{"name": "role", "type": "string"}],
      "rows": 3,
      "note": "synthetic roles"
    },
    "status": "pending_review"
  },
  "REQ-5": {
    "test_case_id": "TC-005",
    "req_id": "REQ-5",
    "title": "Verify auto-logout after inactivity",
    "test_steps": [
      {"step": 1, "action": "Login as user", "expected": "Session starts"},
      {"step": 2, "action": "Wait 10 minutes without activity", "expected": "Session automatically logged out"}
    ],
    "expected_results": "Inactive users are logged out after 10 minutes.",
    "data_profile": {
      "fields": [{"name": "session_id", "type": "string"}],
      "rows": 2,
      "note": "synthetic sessions"
    },
    "status": "pending_review"
  }
};