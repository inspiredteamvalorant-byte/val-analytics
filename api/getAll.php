<?php
require_once __DIR__ . '/../config.php';

$out = [];

$out["players"] = $pdo->query("
  SELECT player_id, player_name, status, role, created_at
  FROM players
")->fetchAll();

$out["matches"] = $pdo->query("
  SELECT *
  FROM matches
  ORDER BY date DESC
")->fetchAll();

$out["player_stats"] = $pdo->query("
  SELECT ps.*, p.player_name, a.agent_name, m.map
  FROM player_stats ps
  JOIN players p ON ps.player_id = p.player_id
  JOIN agents a ON ps.agent_id = a.agent_id
  JOIN matches m ON ps.match_id = m.match_id
")->fetchAll();

$out["agents"] = $pdo->query("SELECT * FROM agents")
  ->fetchAll();

header("Content-Type: application/json");
echo json_encode($out);
?>
