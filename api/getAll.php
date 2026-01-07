<?php
header("Content-Type: application/json");

// Récupérer les variables d'environnement
$supabaseUrl = getenv("SUPABASE_URL");
$supabaseKey = getenv("SUPABASE_KEY");

if (!$supabaseUrl || !$supabaseKey) {
    echo json_encode(["error" => "Variables d'environnement manquantes"]);
    exit;
}

// Fonction pour fetch une table Supabase
function fetchTable($table, $supabaseUrl, $supabaseKey) {
    $url = "$supabaseUrl/rest/v1/$table?select=*";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: $supabaseKey",
        "Authorization: Bearer $supabaseKey",
        "Content-Type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    if ($response === false) {
        return ["error" => "Curl failed", "message" => curl_error($ch)];
    }

    return json_decode($response, true);
}

// Récupérer toutes les tables
$out = [];
$out["players"] = fetchTable("players", $supabaseUrl, $supabaseKey);
$out["matches"] = fetchTable("matches", $supabaseUrl, $supabaseKey);
$out["agents"] = fetchTable("agents", $supabaseUrl, $supabaseKey);
$out["player_stats"] = fetchTable("player_stats", $supabaseUrl, $supabaseKey);

echo json_encode($out);
 
