import React,{useState,useEffect} from 'react';

export default function App(){
  const [input,setInput]=useState({text:'',amount:""});
  const [transactions,setTransactions]=useState(()=>{
    const stored=localStorage.getItem("transactions");
    return stored?JSON.parse(stored):[];
  });

  const amounts = transactions.map(t => t.amount);

  const income = amounts
    .filter(a => a > 0)
    .reduce((acc, cur) => acc + cur, 0);

  const expense = amounts
    .filter(a => a < 0)
    .reduce((acc, cur) => acc + Math.abs(cur), 0);

  const balance = income - expense;

  function handleSubmit(e){
    e.preventDefault();
    if(!input.text.trim()) return;
    if(!input.amount || isNaN(input.amount)) return;

    setTransactions(prev => [
      ...prev,
      { id: Date.now(), text: input.text, amount: Number(input.amount) }
    ]);

    setInput({ text:"", amount:"" });
  }

  function handleChange(e){
    const {name,value} = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  }
  function deleteTransaction(id){
    setTransactions(prev=>prev.filter((t)=>t.id!==id));

  
  }
  useEffect(()=>{
    localStorage.setItem("transactions",JSON.stringify(transactions));

  },[transactions])

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center px-4">
      
      <div className="bg-white w-full max-w-md md:max-w-xl lg:max-w-2xl rounded-xl border p-4 sm:p-6 md:p-8">
        
        
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">
          Expense Tracker
        </h1>

        
        <div className="border rounded-lg p-4 mb-6 text-center">
          <p className="text-sm sm:text-base">YOUR BALANCE</p>
          <p className={`text-2xl sm:text-3xl font-bold mt-2 ${
            balance < 0 ? "text-red-500" : "text-green-500"
          }`}>
            ${balance}
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="border rounded-lg p-4 text-center">
            <p className="text-sm">INCOME</p>
            <p className="text-xl text-green-500 font-semibold">${income}</p>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <p className="text-sm">EXPENSES</p>
            <p className="text-xl text-red-500 font-semibold">${expense}</p>
          </div>
        </div>

      
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Add New Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            name="text"
            value={input.text}
            onChange={handleChange}
            placeholder="Text"
            className="w-full border rounded-lg p-2 text-base sm:text-lg"
          />

          <input
            type="number"
            name="amount"
            value={input.amount}
            onChange={handleChange}
            placeholder="Amount (+income, -expense)"
            className="w-full border rounded-lg p-2 text-base sm:text-lg"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setInput({text:"",amount:""})}
              className="w-full sm:w-1/2 bg-gray-400 text-white py-2 rounded-lg"
            >
              Clear
            </button>

            <button
              type="submit"
              className="w-full sm:w-1/2 bg-blue-600 text-white py-2 rounded-lg"
            >
              Add Transaction
            </button>
          </div>
        </form>

        
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-left">
          History
        </h2>
        {transactions.length===0?(
          <p className='text-center text-gray'>No transactions</p>

        ):

       ( <ul className="space-y-2">
          {transactions.map(item => (
            <li
              key={item.id}
              className="flex justify-between items-center border p-2 rounded-lg"
            >
              <span className="capitalize text-sm sm:text-base">
                {item.text}
              </span>
              <span className={`font-medium ${
                item.amount < 0 ? "text-red-500" : "text-green-500"
              }`}>
                ${item.amount}
              </span>
              <button className="text-red-500 hover:text-red-700 font-medium" onClick={()=>deleteTransaction(item.id)}>✕</button>
            </li>
          ))}
        </ul>
        )}

      </div>
    </div>
  );
}
