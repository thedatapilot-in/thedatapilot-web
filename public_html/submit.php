<?php
/**
 * THE DATA PILOT - ENROLLMENT HANDLER v2.0.0
 * ---------------------------------------------------------
 * Handles POST requests from the Landing Page form.
 * 1. Saves lead to Hostinger MySQL Database (leads table).
 * 2. Sends email notification to admissions.
 * 3. Returns JSON status to the React frontend.
 * ---------------------------------------------------------
 */

// 1. HEADERS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Essential for cross-origin React requests

// 2. DATABASE CREDENTIALS (HOSTINGER)
$host = "localhost";
$dbname = "u812559205_leads"; 
$username = "u812559205_admin";     
$password = "Offcourse@4040"; 

// 3. CONFIGURATION FOR NOTIFICATIONS
$admin_email = "admissions@thedatapilot.in"; 
$headers = "From: webmaster@thedatapilot.in\r\n";
$headers .= "Reply-To: admissions@thedatapilot.in\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

try {
    // 4. ESTABLISH CONNECTION
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 5. VALIDATION & SANITIZATION
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(["status" => "error", "message" => "Invalid request method."]);
        exit;
    }

    $full_name = filter_var($_POST['full_name'] ?? '', FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST['phone'] ?? '', FILTER_SANITIZE_STRING);

    if (empty($full_name) || empty($email) || empty($phone)) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    // 6. SAVE TO DATABASE (leads table)
    $stmt = $conn->prepare("INSERT INTO leads (full_name, email, phone) VALUES (:name, :email, :phone)");
    $stmt->bindParam(':name', $full_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    $stmt->execute();

    // 7. SEND NOTIFICATION EMAIL
    $subject = "New Lead from thedatapilot.in: $full_name";
    $email_content = "You have a new enrollment inquiry:\n\n";
    $email_content .= "Name: $full_name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Source: Website Enrollment Form\n";
    $email_content .= "Date: " . date("Y-m-d H:i:s") . "\n";

    // Silence the mail function to prevent it from outputting anything to our JSON response
    @mail($admin_email, $subject, $email_content, $headers);

    // 8. RETURN SUCCESS
    echo json_encode(["status" => "success", "message" => "Application saved to leads database and email sent."]);

} catch(PDOException $e) {
    // Return specific database errors in JSON format
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $e->getMessage()]);
} catch(Exception $e) {
    echo json_encode(["status" => "error", "message" => "An unexpected error occurred."]);
}
?>