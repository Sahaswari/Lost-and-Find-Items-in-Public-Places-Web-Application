import { useContext, useEffect, useState } from "react"
import Footer from "../componetes/Footer"
import Navbar from "../componetes/Navbar"
import {ImCross} from 'react-icons/im'
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


const EditPost = () => {
  const postId=useParams().id
  const {user}=useContext(UserContext)
  const [contactNo,setContactNo]=useState("")
  const navigate=useNavigate()
  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  const [file,setFile]=useState(null)
  const [cat,setCat]=useState("")
  const [cats,setCats]=useState([])

  const fetchPost=async()=>{
    try{
      const res=await axios.get(URL+"/api/posts/"+postId)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFile(res.data.photo)
      setCats(res.data.categories)
      setContactNo(res.data.contactNo)

    }
    catch(err){
      console.log(err)
    }
  }

  const handleUpdate=async (e)=>{
    e.preventDefault()
    const post={
      title,
      desc,
      username:user.username,
      userId:user._id,
      categories:cats,
      contactNo:contactNo
    }

    if(file){
      const data=new FormData()
      const filename=Date.now()+file.name
      data.append("img",filename)
      data.append("file",file)
      post.photo=filename
      // console.log(data)
      //img upload
      try{
        const imgUpload=await axios.post(URL+"/api/upload",data)
        // console.log(imgUpload.data)
      }
      catch(err){
        console.log(err)
      }
    }
    //post upload
   
    try{
      const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
      navigate("/posts/post/"+res.data._id)
      // console.log(res.data)

    }
    catch(err){
      console.log(err)
    }
  }

  

  useEffect(()=>{
    fetchPost()
  },[postId])

  const deleteCategory = (i) => {
    let updatedCats = [...cats]
    updatedCats.splice(i)
    setCats(updatedCats)

  }
  const addCategory = () => {
    let updatedCats = [...cats]
    updatedCats.push(cat)
    setCat("")
    setCats(updatedCats)
  }
  return (

   <div className=" bg-gray-100 ">
    <Navbar/>
    <div className="px-6 md:px-32 mt-8 w-[80%]">
      <h1 className="font-bold text-2xl md:text-3xl mt-8">Update a post</h1>
      <form className="w-full mt-4 space-y-4 md:space-y-8">
        <input  onChange={(e)=>setTitle(e.target.value)} value={title} type="text" className="px-4 py-2 outline-none w-full  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter post title"></input>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" className="px-4 w-full md:w-2/3"></input>
        <div className="flex flex-col">
          <div className="flex items-center space-x-4 md:space-x-8">
            <input value={cat} onChange={(e)=>setCat(e.target.value)} className="px-4 py-2 outline-none   border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter the post catergory" type="text"></input>
            <div onClick={addCategory} className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold cursor-pointer hover:bg-blue-600">Add</div>            
          </div>

          <div className="flex px-4 mt-3">
            {cats?.map((c,i)=>(
          <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
            <p>{c}</p>
            <p onClick={()=>deleteCategory(i)} className="text-white bg-red-500 rounded-full cursor-pointer p-1 text-sm hover:bg-red-600"><ImCross/></p>
          </div> ))}
            
          </div>
        </div>
        <textarea  onChange={(e)=>setDesc(e.target.value)} value={desc}  rows={15} cols={30} className="px-4 py-2 outline-none w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter post description"/>
        <input onChange={(e)=>setContactNo(e.target.value)} value={contactNo} type="text" className="px-4 py-2 outline-none w-full md:w-2/3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter contact Number"></input>
        <div className="flex flex-wrap">
        <button onClick={handleUpdate}  className="bg-blue-500 w-full md:w-1/4 mx-auto text-white font-semibold px-4 py-2 rounded-lg md:text-xl text-lg hover:bg-blue-600">Update</button>
        </div>
        
      </form>

    </div>
    <Footer/>
          </div>

  )
}

export default EditPost
