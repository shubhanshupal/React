import React, {useState, useEffect} from 'react'
import { useLoaderData } from 'react-router-dom';


function GithubProfile() {
  const data = useLoaderData();
    // const[data,setData]= useState([]);
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/shubhanshupal')
    //     .then(res => res.json())
    //     .then(data => setData(data));
    // }
    // ,[]);
  return (
    <div>GithubProfile
        <h1 className='text-2xl bold m-2 p-2'>Followers:{data.followers}</h1>
        <div className='w-full flex bg-red-100 justify-center p-4'>
            <img src={data.avatar_url} alt="git" className='h-[200px] w-[200px]'/>
        </div>
    </div>
  )
}

export default GithubProfile

export const githubInfoLoader = async()=>{
    const res = await fetch('https://api.github.com/users/shubhanshupal');
    const data = res.json();
    return data;
}