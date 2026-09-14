<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

$db = get_db();
$activeToken = $_GET['session'] ?? '';

$stmt = $db->query('SELECT id, token, visitor_name, last_activity FROM chat_sessions ORDER BY last_activity DESC');
$sessions = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Chat Inbox &mdash; The Data Pilot Admin</title>
<style>
  body { font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; display: flex; height: 100vh; }
  .sidebar { width: 260px; background: #1e293b; overflow-y: auto; border-right: 1px solid #334155; }
  .sidebar a { display: block; padding: .7rem 1rem; color: #e2e8f0; text-decoration: none; border-bottom: 1px solid #334155; font-size: .85rem; }
  .sidebar a.active { background: #0f172a; }
  .sidebar a.back { color: #658a55; }
  .main { flex: 1; display: flex; flex-direction: column; padding: 1rem; }
  #messages { flex: 1; overflow-y: auto; margin-bottom: 1rem; display: flex; flex-direction: column; }
  .msg { max-width: 70%; padding: .5rem .8rem; border-radius: 10px; margin-bottom: .5rem; font-size: .9rem; }
  .msg.visitor { background: #334155; align-self: flex-start; }
  .msg.admin { background: #658a55; align-self: flex-end; }
  form { display: flex; gap: .5rem; }
  input { flex: 1; padding: .6rem; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; }
  button { padding: .6rem 1rem; border-radius: 6px; border: none; background: #658a55; color: #fff; cursor: pointer; }
</style>
</head>
<body>
  <div class="sidebar">
    <a class="back" href="dashboard.php">&larr; Leads</a>
    <?php foreach ($sessions as $s): ?>
      <a href="?session=<?= htmlspecialchars($s['token']) ?>" class="<?= $s['token'] === $activeToken ? 'active' : '' ?>">
        <?= htmlspecialchars($s['visitor_name'] ?: 'Visitor ' . $s['id']) ?><br>
        <small style="color: #94a3b8;"><?= htmlspecialchars($s['last_activity']) ?></small>
      </a>
    <?php endforeach; ?>
    <?php if (!$sessions): ?>
      <div style="padding: 1rem; color: #94a3b8; font-size: .85rem;">No chats yet.</div>
    <?php endif; ?>
  </div>
  <div class="main">
    <?php if ($activeToken): ?>
      <div id="messages"></div>
      <form id="sendForm">
        <input type="text" id="msgInput" placeholder="Type a reply..." autocomplete="off" required>
        <button type="submit">Send</button>
      </form>
      <script>
        const token = <?= json_encode($activeToken) ?>;
        let lastId = 0;
        const box = document.getElementById('messages');

        function render(messages) {
          messages.forEach((m) => {
            const div = document.createElement('div');
            div.className = 'msg ' + m.sender;
            div.textContent = m.message;
            box.appendChild(div);
            lastId = Math.max(lastId, m.id);
          });
          box.scrollTop = box.scrollHeight;
        }

        function poll() {
          fetch('api_chat_poll.php?token=' + encodeURIComponent(token) + '&since_id=' + lastId)
            .then((r) => r.json())
            .then((data) => { if (data.messages) render(data.messages); });
        }

        poll();
        setInterval(poll, 5000);

        document.getElementById('sendForm').addEventListener('submit', (e) => {
          e.preventDefault();
          const input = document.getElementById('msgInput');
          const message = input.value.trim();
          if (!message) return;
          input.value = '';
          fetch('api_chat_send.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'token=' + encodeURIComponent(token) + '&message=' + encodeURIComponent(message)
          }).then(poll);
        });
      </script>
    <?php else: ?>
      <p style="color: #94a3b8;">Select a chat from the left.</p>
    <?php endif; ?>
  </div>
</body>
</html>
