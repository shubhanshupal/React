import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'

function App() {
 const { register, handleSubmit, watch, formState: { errors, isSubmitting },} = useForm();

 async function submit(data){
  await new Promise((resolve)=>setTimeout(resolve,5000));
    console.log("sumbitted data: ",data);
 }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label>First Name:</label>
        <input {...register('firstname',{required: true, minLength: 3, maxLength: 20,})}/>
      </div>
      <div>
        <label>Middle Name:</label>
        <input {...register('middleName',
          { 
            required: true, 
            minLength: {value: 4, message: "Minimum length should be 4"}, 
            maxLength: {value:20, message: "Maximum length should be 20"},})}/>
            {errors.middleName && <p className='text-red-500'>{errors.middleName.message}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input {...register('lastName')}/>
      </div>
      <div>
        <label>Age:</label>
        <input type="number" {...register('age',
          { required:true,
            min:{value:18, message:"Minimum age should be 18"}, 
            max:{value:70, message:"Maximum age should be 70"},
            minLength:{value: 1, message: "Minimum length should be 1"},
            maxLength:{value: 2, message: "Maximum length should be 2"}})}/>
            {errors.age && <p className='text-red-500'>{errors.age.message}</p>}
      </div>
      <input type="submit" disabled={isSubmitting} value={isSubmitting?'Submitting..':'Submit'}/>
    </form>
  )
}

export default App
