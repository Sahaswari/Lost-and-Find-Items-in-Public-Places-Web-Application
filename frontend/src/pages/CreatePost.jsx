import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import Footer from "../componetes/Footer";
import Navbar from "../componetes/Navbar";
import { ImCross } from 'react-icons/im';
import { URL } from '../url';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [contactno, setContactNo] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
      contactNo: contactno,
    };

    // Image upload
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    // Post upload
    try {
      const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" bg-gray-100 " >
      <Navbar />
      <div className="px-6 md:px-32 mt-8 w-[80%]">
        <h1 className="font-bold text-2xl md:text-3xl mt-8">Create a post</h1>
        <form className="w-full mt-4 space-y-4 md:space-y-8">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="px-4 py-2 outline-none w-full  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4 w-full md:w-2/3"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none   border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold cursor-pointer hover:bg-blue-600"
              >
                Add
              </div>
            </div>
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-red-500 rounded-full cursor-pointer p-1 text-sm hover:bg-red-600"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post description"
          />
          <input
            onChange={(e) => setContactNo(e.target.value)}
            type="text"
            className="px-4 py-2 outline-none w-full md:w-2/3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter contact number"
          />
          <div className="flex flex-wrap">
            <button
              onClick={handleCreate}
              className="bg-blue-500 w-full md:w-1/4 mx-auto text-white font-semibold px-4 py-2 rounded-lg md:text-xl text-lg hover:bg-blue-600"
            >
              Create
            </button>
          </div>

        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
