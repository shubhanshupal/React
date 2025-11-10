import React,{useId} from 'react'

function InputType({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions =[],
    selectCurrency = "usd",
    // amountDisabled=false,
    // currencyDisabled=false,
}) {
    const amountInputId = useId();
    return (
        <div className='h-10/21 w-full border bg-white rounded'>
            <div className='p-4 flex justify-between items-center'>
                <label className='text-lg font-medium' htmlFor={amountInputId}>{label}</label>
                <label className='text-lg font-medium'>Currency Type</label>
            </div>
            <div className='p-4 flex justify-between items-center'>
                <input type="number" id={amountInputId} className=' p-2 rounded w-1/3 text-left' placeholder='Amount'value={amount} onChange={(e)=> onAmountChange && onAmountChange(Number(e.target.value))} />

                <select className='ml-4 p-2 border rounded' value={selectCurrency} onChange={(e)=>onCurrencyChange && onCurrencyChange(e.target.value)}  >

                    {currencyOptions.map((currency)=><option key={currency} value={currency}>{currency}</option>)}
                    {/* <option>USD</option> */}
                </select>
            </div>
        </div>
    )
}

export default InputType;