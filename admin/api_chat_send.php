<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

$token = $_POST['token'] ?? '';
$message = trim($_POST['message'] ?? '');

if ($token === '' || $message === '') {
    echo json_encode(['status' => 'error', 'message' => 'Missing token or message.']);
    exit;
}

$db = get_db();
$stmt = $db->prepare('SELECT id FROM chat_sessions WHERE token = :token');
$stmt->execute([':token' => $token]);
$session = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$session) {
    echo json_encode(['status' => 'error', 'message' => 'Unknown chat session.']);
    exit;
}

$stmt = $db->prepare("INSERT INTO chat_messages (session_id, sender, message) VALUES (:sid, 'admin', :message)");
$stmt->execute([':sid' => $session['id'], ':message' => $message]);

$stmt = $db->prepare('UPDATE chat_sessions SET last_activity = CURRENT_TIMESTAMP WHERE id = :sid');
$stmt->execute([':sid' => $session['id']]);

echo json_encode(['status' => 'success']);
