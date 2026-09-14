<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

$id = (int) ($_GET['id'] ?? 0);
$db = get_db();
$statuses = ['new', 'contacted', 'follow_up', 'enrolled', 'lost'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'update_status' && in_array($_POST['status'] ?? '', $statuses, true)) {
        $stmt = $db->prepare('UPDATE leads SET status = :status WHERE id = :id');
        $stmt->execute([':status' => $_POST['status'], ':id' => $id]);
    }

    if ($action === 'add_note') {
        $note = trim($_POST['note'] ?? '');
        if ($note !== '') {
            $stmt = $db->prepare('INSERT INTO lead_notes (lead_id, note) VALUES (:lead_id, :note)');
            $stmt->execute([':lead_id' => $id, ':note' => $note]);
        }
    }

    header('Location: lead.php?id=' . $id);
    exit;
}

$stmt = $db->prepare('SELECT * FROM leads WHERE id = :id');
$stmt->execute([':id' => $id]);
$lead = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$lead) {
    http_response_code(404);
    echo 'Lead not found.';
    exit;
}

$stmt = $db->prepare('SELECT * FROM lead_notes WHERE lead_id = :id ORDER BY created_at DESC');
$stmt->execute([':id' => $id]);
$notes = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title><?= htmlspecialchars($lead['full_name']) ?> &mdash; The Data Pilot Admin</title>
<style>
  body { font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 2rem; max-width: 640px; }
  h1 { font-size: 1.3rem; }
  h2 { font-size: 1rem; margin-top: 2rem; }
  .meta { color: #94a3b8; margin-bottom: 1.5rem; }
  .meta div { margin-bottom: .3rem; }
  select, textarea, button { padding: .5rem; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; }
  textarea { width: 100%; box-sizing: border-box; min-height: 70px; }
  button { background: #658a55; border: none; color: #fff; font-weight: 600; cursor: pointer; margin-top: .5rem; }
  .note { background: #1e293b; padding: .6rem .8rem; border-radius: 6px; margin-bottom: .6rem; font-size: .9rem; }
  .note time { color: #94a3b8; font-size: .75rem; display: block; margin-top: .3rem; }
  a { color: #658a55; }
</style>
</head>
<body>
  <a href="dashboard.php">&larr; Back to leads</a>
  <h1><?= htmlspecialchars($lead['full_name']) ?></h1>
  <div class="meta">
    <div>Email: <?= htmlspecialchars($lead['email']) ?></div>
    <div>Phone: <?= htmlspecialchars($lead['phone']) ?></div>
    <div>Created: <?= htmlspecialchars($lead['created_at']) ?></div>
  </div>

  <form method="POST">
    <input type="hidden" name="action" value="update_status">
    <label for="status">Status:</label>
    <select id="status" name="status" onchange="this.form.submit()">
      <?php foreach ($statuses as $s): ?>
        <option value="<?= $s ?>" <?= $lead['status'] === $s ? 'selected' : '' ?>><?= $s ?></option>
      <?php endforeach; ?>
    </select>
  </form>

  <h2>Notes</h2>
  <form method="POST">
    <input type="hidden" name="action" value="add_note">
    <textarea name="note" placeholder="Add a note..." required></textarea>
    <button type="submit">Add Note</button>
  </form>

  <?php foreach ($notes as $note): ?>
    <div class="note">
      <?= nl2br(htmlspecialchars($note['note'])) ?>
      <time><?= htmlspecialchars($note['created_at']) ?></time>
    </div>
  <?php endforeach; ?>
  <?php if (!$notes): ?>
    <p style="color: #94a3b8;">No notes yet.</p>
  <?php endif; ?>
</body>
</html>
