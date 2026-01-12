import Sidebar from "./Sidebar";
import Header from "./Header";
export default function Layout({children}){
  return(<>
    <Sidebar/>
    <Header/>
    <main className="ml-64 mt-20 p-6 bg-gray-50 min-h-screen">{children}</main>
  </>);
}
