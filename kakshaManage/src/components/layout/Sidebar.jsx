export default function Sidebar(){
  const menu=[{n:"Dashboard",p:"/"},{n:"Students",p:"/students"},{n:"Attendance",p:"/attendance"},{n:"Fees",p:"/fees"}];
  return(<aside className="w-64 h-screen bg-white shadow-lg p-4 fixed">
    <h1 className="text-2xl font-bold mb-6">Kaksha Manage</h1>
    <nav>{menu.map(i=>(<a key={i.p} href={i.p} className="block p-2 rounded-lg hover:bg-gray-100 mb-2">{i.n}</a>))}</nav>
  </aside>);
}
