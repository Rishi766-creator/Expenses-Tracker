import React,{useState} from 'react';
export default function App(){
  const [income,setIncome]=useState(0);
  const [expense,setExpense]=useState(0);
  const [input,setInput]=useState({text:'',amount:0});
  const [tran,setTran]=useState([]);
  const bal=income-expense;
  function sub(e){
    e.preventDefault();
    const amount=parseInt(input.amount);
    if(amount<0){
      setExpense(prev=>prev+Math.abs(amount));
    }
    else{
      setIncome(prev=>prev+amount);
    }
    setTran(prev=>[...prev,input]);
    
    

  }
  function change1(e){
    setInput({...input,text:e.target.value});
  }
  function change2(e){
    setInput({...input,amount:e.target.value});
  }
  function clear(e){
    e.preventDefault();
    setInput({text:'',amount:0});
  }
  return(
    <>
    <div className="bg-gray-200 min-h-screen flex justify-center items-center ">
      <div className="bg-white rounded-lg border-2 border-gray-500 px-10">
        <h1 className=" text-center text-4xl mb-5 font-semibold mt-3">Expense Tracker</h1>
        <div  className="border-2 border-gray-500 rounded-lg flex flex-col p-4 "><div className="mb-3"><p className="text-lg text-center">YOUR BALANCE</p></div><div className={`text-3xl text-center  ${bal<0? 'text-red-500':'text-green-500'} font-semibold`}>${income-expense}</div></div>
        <div className="flex justify-center items-center w-full"><div className="border-2 border-gray-300 rounded-lg m-4 flex flex-col text-center p-3 m-4 flex-1 "><p className="text-lg mb-2">INCOME</p><p className="text-2xl text-green-500">${income}</p></div><div className="border-2 border-gray-300 rounded-lg flex flex-col text-center p-3 flex-1 m-4"><p className="text-lg mb-2">EXPENSES</p><p className="text-2xl text-red-500">${expense}</p></div></div>
        <h1 className="text-left text-3xl mb-5 ">Add New Transaction</h1>
        <form className="mb-5 flex flex-col justify-center items-center" onSubmit={sub}>
          <input type="text" name="text" value={input.text||''} placeholder="Text" onChange={change1} className="border-2 border-gray-500 rounded-lg outline-none w-[90%] p-2 text-xl mb-5"></input>
          <input type="text" name="amount" value={input.amount||''} placeholder="Amount($)" onChange={change2} className="border-2 border-gray-500  mb-4 rounded-lg outline-none w-[90%] p-2 text-xl"/>
          <button onClick={clear} className="p-2 bg-gray-500 rounded-lg mb-4">Clear</button>
          <button type="submit" className="bg-blue-600 rounded-lg py-2 w-[90%]">Add Transaction</button>
        </form>
        <h1 className="text-left text-3xl mb-5">History</h1>
        <ul>
          {tran.map((item,index)=>(
            <li key={index} className="flex justify-between items-center"><div className="capitalize text-lg">{item.text}</div><div className={`text-lg ${item.amount<0?'text-red-500':'text-green-500'}`}>${item.amount}</div></li>
          ))}
        </ul>

      </div>
    </div>
    </>
  )
}