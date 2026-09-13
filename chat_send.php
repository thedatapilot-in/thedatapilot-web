<?php
/**
 * THE DATA PILOT - CHAT MESSAGE SENDER (VISITOR)
 * ---------------------------------------------------------
 * Accepts a visitor chat message for an existing open
 * chat_sessions token.
 * ---------------------------------------------------------
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/admin/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

$token = $_POST['token'] ?? '';
$message = trim($_POST['message'] ?? '');

if ($token === '' || $message === '') {
    echo json_encode(['status' => 'error', 'message' => 'Missing token or message.']);
    exit;
}

try {
    $db = get_db();
    $stmt = $db->prepare("SELECT id FROM chat_sessions WHERE token = :token AND status = 'open'");
    $stmt->execute([':token' => $token]);
    $session = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$session) {
        echo json_encode(['status' => 'error', 'message' => 'Chat session not found or closed.']);
        exit;
    }

    $stmt = $db->prepare("INSERT INTO chat_messages (session_id, sender, message) VALUES (:sid, 'visitor', :message)");
    $stmt->execute([':sid' => $session['id'], ':message' => $message]);

    $stmt = $db->prepare('UPDATE chat_sessions SET last_activity = CURRENT_TIMESTAMP WHERE id = :sid');
    $stmt->execute([':sid' => $session['id']]);

    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Could not send message.']);
}
