import {IF} from "../url"

const HomePostElectronic = ({post}) => {
  return (
    <div className="w-full flex mt-8 space-x-0">
      
      {/*left*/}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IF+post.photo} alt="" className="w-[350px] flex justify-center items-center h-full px-5"/>
      </div>

      {/*right*/}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>

        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <div className="flex space-x-2">
            {post.categories?.map((c,i)=>(
              <div key={i} >{c}</div>
            ))}
          </div>
          
          {/*<p className="space-x-4">{post.categories}</p>*/}

        <div className="flex space-x-2 ">
          <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
          <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
        </div>
        
        </div>
        <p className="text-sm md:text-lg">{post.desc.slice(0,200)+" ...Read more"}</p>
        <p className="text-sm md:text-m">Posted by : {post.username}</p>
        <p className="text-sm md:text-m">Contact Number : {post.contactNo}</p>
      </div>
      
    </div>
  )
}

export default HomePostElectronic
