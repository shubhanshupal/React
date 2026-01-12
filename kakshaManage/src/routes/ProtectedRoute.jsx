export default function Protected({children}){
    return localStorage.getItem("token")? children: (window.location.href="/login",null);
}
