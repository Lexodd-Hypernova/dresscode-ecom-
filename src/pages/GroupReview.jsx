import { useEffect, useState } from "react";
import ImageUploader from "react-images-upload";
import { TextareaAutosize } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { S3imageApis, shoppingInfoApis } from "../common";
import "./pages-styles/GroupReview.styles.css";
const GroupReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const paramas = useParams(); // Assuming groupName is obtained correctly
  const navigate=useNavigate()
console.log(paramas,"paramns id")
  const handleRatingChange = (value) => {
    setRating(value);
  };
  const goToReviews=()=>{
    navigate("/customer-review/"+paramas.group+"/"+paramas.productId)
  }
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const onDrop = async (images) => {
    try {
      const formData = new FormData();
      formData.append('image', images[0]); 
  
      const response = await axios.post(S3imageApis.uploadImage, formData);
      const imgUrl = response.data.imgURL;
  
      setSelectedImages([...selectedImages, imgUrl]);
      console.log(selectedImages);
  
    } catch (error) {
      console.error(error);
    }
  };
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleSaveReview = async () => {
    try {
      const res=await axios.post(shoppingInfoApis.addReview(paramas.group,paramas.productId), {
        username:"demo2",
          rating,
          comment,
          imgUrl:selectedImages
      },config)    
      console.log(res)
      if(res.data.message){
        goToReviews()
      }
    } catch (error) {
        console.log(error)
    }
  };
  useEffect(()=>{
    console.log(selectedImages)
  },[selectedImages])
  
  return (
    <div style={{ textAlign: "center" }} className="">
      <h2>Create Review</h2>
      <hr />
      <div className="main">
        <span>Overall Rating: </span>
        <div>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              onClick={() => handleRatingChange(index + 1)}
              style={{
                cursor: "pointer",
                color: index < rating ? "gold" : "gray",
                fontSize: "2.5rem",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <hr />
      <div>
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={onDrop}
          imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".svg"]}
          maxFileSize={5242880}
          withPreview={true}
          singleImage={false}
        />
      </div>
      <hr />
      <div>
        {/* Use TextareaAutosize for resizable textarea */}
        <TextareaAutosize
          placeholder="Add your comment..."
          value={comment}
          onChange={handleCommentChange}
          minRows={4}
          style={{
            width: "60%",
            marginBottom: "10px",
            textAlign: "center",
          }}
          variant="outlined"
        />
      </div>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        style={{ maxWidth: "150px" }}
        onClick={handleSaveReview}
      >
        Save
      </button>
    </div>
  );
};

export default GroupReview;
