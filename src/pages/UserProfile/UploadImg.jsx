import { useState } from "react"
function UploadImg() {
  
    const [imgUrl,setImgUrl] = useState('')
    const [imgPreview,setImgPreview] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const handelImgChange = (e)=>
    {
        setImgUrl(e.target.files[0])
        setImgPreview(URL.createObjectURL(e.target.files[0]))
    }

    const uploadImg = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            let imageURL;

            if(imgUrl && (
                imgUrl.type === "image/png" ||
                imgUrl.type === "image/jpg" ||
                imgUrl.type === "image/jpeg" ))
            {
                const image = new FormData()
                image.append("file", imgUrl)
                image.append("cloud_name", "dywqswxz9")
                image.append("upload_preset", "dcqofyur")

                const res = await fetch(
                    // CLOUDINARY_URL=cloudinary://614342951996957:mf2rxcQEmR2eruq6mGXwkWU26xE@dywqswxz9
                    "https://api.cloudinary.com/v1_1/dywqswxz9/image/upload",
                    {
                        method: "post",
                        body: image
                    }
                )

                const imgData = await res.json()
                imageURL = imgData.url.toString()
                setImgPreview(null)
            }
            alert(imageURL)
            setLoading(false)
        }
        catch(err){
            console.log(err.message)
        }
    }
  return (
    <>
    <form onSubmit={uploadImg}>
        <label htmlFor="image">
            Upload your image
        </label>
    
        <input type="file" name="image" 
        accept="image/png, image/jpeg, image/jpg" id="" 
        onChange={handelImgChange}/>

        <p>{
        isLoading 
        ? "Uploading..." 
        : <button type="submit">Upload Image</button>}</p>
    </form>

    <div>
        {   imgPreview && 
            <img src={imgPreview && imgPreview} alt="img url" />
        }
    </div>
    </>
  )
}

export default UploadImg