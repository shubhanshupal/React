import React from "react";

const data = [
    { name: "Heading 1", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", inStock:false },
    { name: "Heading 2", image: "https://plus.unsplash.com/premium_photo-1750116257648-64c9c39dbd8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", inStock:true },
    { name: "Heading 3", image: "https://plus.unsplash.com/premium_photo-1664803534514-7173b42bc098?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", inStock:false }
];


function Card() {

    const handleClickDownload=()=>{
        alert("button clicked");
    }
    return (
        <div className="h-screen w-full bg-zinc-300 flex gap-[10px] items-center justify-center ">
            {data.map((elem,index)=>( 
                <div key={index} className="w-40 h-60 bg-white border rounded " >
                    <div className="w-full h-[100px] bg-zinc-300">
                        <img src={elem.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="w-full px-3 py-3">
                        <h1 className="font-semibold">{elem.name}</h1>
                        <p className="text-xs text-justify mt-2">{elem.description}</p>
                        <button onClick={handleClickDownload} className={`text-sm ${elem.inStock?'bg-sky-600':'bg-red-600'} p-x-1 p-1 rounded mt-2`}>{elem.inStock?'In Stock':'Out of Stock'}</button>
                    </div>
    
                </div>
            ))}
        </div>
    );

}

export default Card;

