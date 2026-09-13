<?php
/**
 * THE DATA PILOT - CHAT SESSION STARTER
 * ---------------------------------------------------------
 * Creates a new anonymous chat_sessions row and returns its
 * token. Called once by chat-widget.js and cached in the
 * visitor's localStorage.
 * ---------------------------------------------------------
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/admin/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

$visitorName = trim($_POST['visitor_name'] ?? '');
$raw = bin2hex(random_bytes(16));
$token = substr($raw, 0, 8) . '-' . substr($raw, 8, 4) . '-' . substr($raw, 12, 4) . '-' . substr($raw, 16, 4) . '-' . substr($raw, 20, 12);

try {
    $db = get_db();
    $stmt = $db->prepare('INSERT INTO chat_sessions (token, visitor_name) VALUES (:token, :name)');
    $stmt->execute([':token' => $token, ':name' => $visitorName !== '' ? $visitorName : null]);
    echo json_encode(['status' => 'success', 'token' => $token]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Could not start chat session.']);
}
