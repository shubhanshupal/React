import './App.css'
import Card from './Components/Card'

function App() {
const img_src=['https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png','https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png']
  return (
    <>
      {/* <h2 className='bg-sky-200 p-4 rounded-xl text-red-500'>hello</h2> */}
    <div className="p-1 flex flex-wrap items-center justify-center h-screen">

      {/* <Card product= "Peace lily" product_type="Indoor"/> */}
      <Card product= "Peace lily" product_type="Indoor" price="30" img_src={img_src[0]}/>
      <Card product= "Monstera" product_type="Outdoor" price="50" img_src={img_src[1]}/>

    </div>
    </>
  )
}

export default App
