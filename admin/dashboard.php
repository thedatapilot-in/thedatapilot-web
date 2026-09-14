<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

$statusFilter = $_GET['status'] ?? '';
$search = trim($_GET['q'] ?? '');

$sql = 'SELECT id, full_name, email, phone, status, created_at FROM leads WHERE 1=1';
$params = [];

if ($statusFilter !== '') {
    $sql .= ' AND status = :status';
    $params[':status'] = $statusFilter;
}

if ($search !== '') {
    $sql .= ' AND (full_name LIKE :q OR email LIKE :q OR phone LIKE :q)';
    $params[':q'] = "%$search%";
}

$sql .= ' ORDER BY created_at DESC';

$stmt = get_db()->prepare($sql);
$stmt->execute($params);
$leads = $stmt->fetchAll(PDO::FETCH_ASSOC);

$statuses = ['new', 'contacted', 'follow_up', 'enrolled', 'lost'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Leads &mdash; The Data Pilot Admin</title>
<style>
  body { font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 2rem; }
  h1 { font-size: 1.3rem; }
  .topbar { display: flex; justify-content: space-between; align-items: center; }
  .topbar a { color: #658a55; text-decoration: none; }
  .toolbar { display: flex; gap: .5rem; margin: 1rem 0; flex-wrap: wrap; }
  input, select, button { padding: .5rem; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; }
  button { cursor: pointer; }
  table { width: 100%; border-collapse: collapse; background: #1e293b; border-radius: 8px; overflow: hidden; }
  th, td { text-align: left; padding: .6rem .8rem; border-bottom: 1px solid #334155; font-size: .9rem; }
  th { background: #0f172a; color: #94a3b8; text-transform: uppercase; font-size: .75rem; }
  a { color: #658a55; }
  .badge { padding: .15rem .5rem; border-radius: 999px; font-size: .75rem; white-space: nowrap; }
  .badge.new { background: #3730a3; }
  .badge.contacted { background: #854d0e; }
  .badge.follow_up { background: #9a3412; }
  .badge.enrolled { background: #166534; }
  .badge.lost { background: #7f1d1d; }
</style>
</head>
<body>
  <div class="topbar">
    <h1>Leads</h1>
    <div><a href="chat.php">Chat Inbox</a> &nbsp;|&nbsp; <a href="logout.php">Log Out</a></div>
  </div>
  <form class="toolbar" method="GET">
    <input type="text" name="q" placeholder="Search name/email/phone" value="<?= htmlspecialchars($search) ?>">
    <select name="status">
      <option value="">All statuses</option>
      <?php foreach ($statuses as $s): ?>
        <option value="<?= $s ?>" <?= $statusFilter === $s ? 'selected' : '' ?>><?= $s ?></option>
      <?php endforeach; ?>
    </select>
    <button type="submit">Filter</button>
  </form>
  <table>
    <tr><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Created</th><th></th></tr>
    <?php foreach ($leads as $lead): ?>
      <tr>
        <td><?= htmlspecialchars($lead['full_name']) ?></td>
        <td><?= htmlspecialchars($lead['email']) ?></td>
        <td><?= htmlspecialchars($lead['phone']) ?></td>
        <td><span class="badge <?= htmlspecialchars($lead['status']) ?>"><?= htmlspecialchars($lead['status']) ?></span></td>
        <td><?= htmlspecialchars($lead['created_at']) ?></td>
        <td><a href="lead.php?id=<?= (int) $lead['id'] ?>">View</a></td>
      </tr>
    <?php endforeach; ?>
    <?php if (!$leads): ?>
      <tr><td colspan="6">No leads found.</td></tr>
    <?php endif; ?>
  </table>
</body>
</html>
