import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Electronic from "./pages/Electronic"
import Others from "./pages/Others"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PostDetailsElectronic from "./pages/PostDetailsElectronic"
import CreatePost from "./pages/CreatePost"
import EditPost from "./pages/EditPost"
import Profile from "./pages/Profile"
import MyPosts from "./pages/MyPosts"
import { UserContextProvider } from "./context/UserContext"


const App = () => {
  return (
    <UserContextProvider>
        <Routes>
        <Route exact path ="/electronic" element={<Electronic/>}/>
        <Route exact path ="/others" element={<Others/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/write" element={<CreatePost/>}/>
        <Route exact path="/edit/:id" element={<EditPost/>}/>
        <Route exact path="/myposts/:id" element={<MyPosts/>}/>
        <Route exact path="/posts/post/:id" element={<PostDetailsElectronic/>}/>
        <Route exact path="/profile/:id" element={<Profile/>}/>
        </Routes>
    </UserContextProvider>
  )
}

export default App
