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

    // 5b. MARKETING ATTRIBUTION & PAYMENT METRICS
    $program_id = filter_var($_POST['program_id'] ?? '', FILTER_SANITIZE_STRING);
    $payment_id = filter_var($_POST['payment_id'] ?? '', FILTER_SANITIZE_STRING);
    $amount_paid = filter_var($_POST['amount_paid'] ?? '', FILTER_SANITIZE_STRING);
    $utm_source = filter_var($_POST['utm_source'] ?? 'organic', FILTER_SANITIZE_STRING);
    $utm_medium = filter_var($_POST['utm_medium'] ?? 'none', FILTER_SANITIZE_STRING);
    $utm_campaign = filter_var($_POST['utm_campaign'] ?? 'none', FILTER_SANITIZE_STRING);
    $utm_term = filter_var($_POST['utm_term'] ?? '', FILTER_SANITIZE_STRING);
    $utm_content = filter_var($_POST['utm_content'] ?? '', FILTER_SANITIZE_STRING);
    
    // If this submission represents an instant payment, stamp the transaction metadata
    if (!empty($payment_id)) {
        $utm_content = "PAID: ₹" . ($amount_paid ?: "N/A") . " | TXN: " . $payment_id . ($utm_content ? " | " . $utm_content : "");
        $utm_medium = "razorpay_checkout";
    }

    $source_url = filter_var($_POST['source_url'] ?? '', FILTER_SANITIZE_URL);
    $referrer = filter_var($_POST['referrer'] ?? '', FILTER_SANITIZE_URL);
    $device_type = filter_var($_POST['device_type'] ?? '', FILTER_SANITIZE_STRING);

    // 6. SAVE TO DATABASE (leads table)
    $stmt = $conn->prepare(
        "INSERT INTO leads (
            full_name, email, phone, program_id,
            utm_source, utm_medium, utm_campaign, utm_term, utm_content,
            source_url, referrer, device_type
        ) VALUES (
            :name, :email, :phone, :program_id,
            :utm_source, :utm_medium, :utm_campaign, :utm_term, :utm_content,
            :source_url, :referrer, :device_type
        )"
    );
    $stmt->bindParam(':name', $full_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':program_id', $program_id);
    $stmt->bindParam(':utm_source', $utm_source);
    $stmt->bindParam(':utm_medium', $utm_medium);
    $stmt->bindParam(':utm_campaign', $utm_campaign);
    $stmt->bindParam(':utm_term', $utm_term);
    $stmt->bindParam(':utm_content', $utm_content);
    $stmt->bindParam(':source_url', $source_url);
    $stmt->bindParam(':referrer', $referrer);
    $stmt->bindParam(':device_type', $device_type);
    $stmt->execute();

    // 7. SEND NOTIFICATION EMAIL TO ADMISSIONS
    if (!empty($payment_id)) {
        $subject = "🎉 PAID ADMISSION: $full_name (₹$amount_paid) - Txn: $payment_id";
        $email_content = "CONGRATULATIONS! A student has completed program payment:\n\n";
        $email_content .= "Name: $full_name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Phone: $phone\n";
        $email_content .= "Program: $program_id\n";
        $email_content .= "Amount Paid: ₹$amount_paid\n";
        $email_content .= "Razorpay Payment ID: $payment_id\n";
        $email_content .= "Date: " . date("Y-m-d H:i:s") . "\n";
    } else {
        $subject = "New Lead from thedatapilot.in: $full_name";
        $email_content = "You have a new enrollment inquiry:\n\n";
        $email_content .= "Name: $full_name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Phone: $phone\n";
        $email_content .= "Source: Website Enrollment Form\n";
        $email_content .= "Date: " . date("Y-m-d H:i:s") . "\n";
    }

    // Silence the mail function to prevent it from outputting anything to our JSON response
    @mail($admin_email, $subject, $email_content, $headers);

    // 7b. SEND CONFIRMATION EMAIL TO THE STUDENT
    if (!empty($payment_id)) {
        $lead_subject = "Admission Confirmed! Welcome to The Data Pilot, $full_name";
        $lead_content = "Hi $full_name,\n\n";
        $lead_content .= "Congratulations and welcome to The Data Pilot family!\n\n";
        $lead_content .= "We have successfully received your admission fee of ₹$amount_paid for $program_id.\n";
        $lead_content .= "Razorpay Reference ID: $payment_id\n\n";
        $lead_content .= "Our academic mentor and student coordinator will contact you within 24 hours with your onboarding package, batch timetable, and classroom credentials.\n\n";
        $lead_content .= "If you need immediate assistance, simply reply to this email or reach us at admissions@thedatapilot.in.\n\n";
        $lead_content .= "Warm regards,\nAdmissions Team\nThe Data Pilot\n";
    } else {
        $lead_subject = "Thanks for reaching out, $full_name!";
        $lead_content = "Hi $full_name,\n\n";
        $lead_content .= "Thanks for your interest in The Data Pilot. We've received your details and our admissions team will reach out to you shortly.\n\n";
        $lead_content .= "If you have any questions in the meantime, just reply to this email.\n\n";
        $lead_content .= "- Team The Data Pilot\n";
    }

    @mail($email, $lead_subject, $lead_content, $headers);

    // 8. RETURN SUCCESS
    echo json_encode([
        "status" => "success", 
        "message" => !empty($payment_id) ? "Payment confirmed and admission recorded." : "Application saved to leads database and email sent."
    ]);

} catch(PDOException $e) {
    // Return specific database errors in JSON format
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $e->getMessage()]);
} catch(Exception $e) {
    echo json_encode(["status" => "error", "message" => "An unexpected error occurred."]);
}
?>