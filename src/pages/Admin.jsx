export default function Admin() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/admin.php"
        title="Admin Panel"
        className="w-full h-full border-0"
      />
    </div>
  );
}
