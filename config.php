<?php
$dsn = sprintf(
    "pgsql:host=%s;port=5432;dbname=%s",
    getenv("SUPABASE_HOST"),
    getenv("SUPABASE_DB")
);

try {
    $pdo = new PDO(
        $dsn,
        getenv("SUPABASE_USER"),
        getenv("SUPABASE_PASSWORD"),
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Erreur connexion BDD",
        "message" => $e->getMessage()
    ]);
    exit;
}
?>
