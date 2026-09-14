<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

$token = $_GET['token'] ?? '';
$sinceId = (int) ($_GET['since_id'] ?? 0);

$db = get_db();
$stmt = $db->prepare('SELECT id FROM chat_sessions WHERE token = :token');
$stmt->execute([':token' => $token]);
$session = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$session) {
    echo json_encode(['messages' => []]);
    exit;
}

$stmt = $db->prepare('SELECT id, sender, message, created_at FROM chat_messages WHERE session_id = :sid AND id > :since ORDER BY id ASC');
$stmt->execute([':sid' => $session['id'], ':since' => $sinceId]);
echo json_encode(['messages' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
