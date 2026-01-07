<?php
header("Content-Type: application/json; charset=UTF-8");

$supabaseUrl = getenv("SUPABASE_URL");
$supabaseKey = getenv("SUPABASE_KEY");

if (!$supabaseUrl || !$supabaseKey) {
    echo json_encode(["error" => "Missing env vars"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$table = $input["table"] ?? null;
$idColumn = $input["idColumn"] ?? null;
$idValue = $input["idValue"] ?? null;
$data = $input["data"] ?? null;

if (!$table || !$idColumn || !$idValue || !$data) {
    echo json_encode(["error" => "Invalid payload"]);
    exit;
}

$url = "$supabaseUrl/rest/v1/$table?$idColumn=eq.$idValue";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: $supabaseKey",
    "Authorization: Bearer $supabaseKey",
    "Content-Type: application/json",
    "Prefer: return=representation"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);

if ($response === false) {
    echo json_encode(["error" => curl_error($ch)]);
    exit;
}

echo $response;
