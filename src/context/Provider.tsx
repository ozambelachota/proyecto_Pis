import { ContextCurso } from "./ContextCursos"
import { useState } from "react"
const Provide= ({children})=>{
  const [user, setUser] = useState({email: "Harold Ozambela", password: ""})
  const [cursos, setCursos] = useState([
    {cursoName0:"matematica 1"},
    {cursoName1:"POO1"},
  ]);

  return (
    <ContextCurso.Provider value={{setUser,user,cursos,setCursos}}>
      {children}
    </ContextCurso.Provider>
  )
}
export default Provide