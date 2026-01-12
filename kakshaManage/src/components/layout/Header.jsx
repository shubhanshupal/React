export default function Header(){
  return(<header className="ml-64 bg-white shadow p-4 flex justify-between items-center fixed w-[calc(100%-16rem)]">
    <span className="text-xl font-semibold">School ERP System</span>
    <div className="flex items-center gap-4">
      <span className="font-medium">Admin Panel</span>
      <button onClick={()=>{localStorage.removeItem("token");window.location.href="/login";}} className="px-3 py-1 border rounded-lg">Logout</button>
    </div>
  </header>);
}
