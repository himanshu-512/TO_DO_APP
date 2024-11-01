import { useEffect, useState } from 'react'
import {TodoContext} from './context'
import { useTodo } from './context'
import { TodoProvider } from './context'
import TodoForm from './componets/TodoForm'
import TodoItem from './componets/TodoItem'
// import './App.css'

function App() {
 const [todos, settodos] = useState([])

 const addtodo = (todo)=> {
  settodos((prev)=> [{id:Date.now,...todo},...prev])
 }

const updateTodo = (id,todo)=> {
   settodos((prev)=>prev.map((prevTodo)=> prevTodo.id===id ? todo : prevTodo))
}
const deleteTodo =(id)=> {
  settodos((prev)=> prev.filter((todo)=> todo.id!==id))
}
const toggleComplete = (id)=>{
  settodos((prev)=> prev.map((prevTodo)=>prevTodo.id===id ? {...prevTodo, completed : !prevTodo.completed } :prevTodo))
}
console.log(toggleComplete)

useEffect(() => {
  const jsonString = JSON.stringify(todos);
  const todos2 = JSON.parse(localStorage.getItem(jsonString))

  if (todos2 && todos.length > 0) {
    settodos(todos2 )
  }
} ,[])
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])




  return (
    <TodoProvider value={{todos, addtodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className='h-screen w-screen bg-[#15243E] flex justify-center items-center'>
        <div className='h-[80vh] bg-red-500 w-[60vw] text-center'>
             <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
               <h1 className='text-2xl font-bold text-center mb-8 mt-2'>Manege your Todo</h1>
              <div className='mb-4'>

                {/* todo form */}
                <TodoForm/>
              </div>
               <div  className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          
                          </div>
                        ))}
               </div>
             </div>

       </div>

      </div>
    </TodoProvider >
  )
}

export default App
