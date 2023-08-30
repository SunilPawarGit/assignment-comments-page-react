import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Replies = ({replyCommentHandler}) => {
  const { currentUser } = useSelector((store) => store.UserReducer);
  const [msg,setMsg]=useState('');
  const [img, setImg] = useState("");
  async function loadImage(imageName) {
    let img = await import(`${imageName}`);
    setImg(img.default);
    // return img.default;
  }
  useEffect(() => {
    if (JSON.stringify(currentUser) !== "{}") {
      loadImage(currentUser?.image?.png);
    }
  }, [currentUser]);
  return (
   <>
    <div
    className="pcView"
      style={{
        display: "flex",
        height: "100px",
        // width: "100%",
        padding: "12px",
        gap: "12px",
        background: "#FFFFFF",
        borderRadius: "8px",
      }}
    >
      <img
        src={currentUser?.image?.png ? img : ""}
        alt="No Icons"
        style={{ height: "40px", width: "40px", borderRadius: "50%" }}
      />
      <textarea
      className="textarea"
      value={msg}
      onChange={e=> setMsg(e.target.value)}
      autoFocus
        style={{
          height: "60px",
          maxHeight: "60px",
          minHeight: "60px",
        //   maxWidth: "80%",
        //   minWidth: "80%",
          padding: "12px",
        }}
      />
      <button
        type="submit"
        style={{
          cursor: "pointer",
          height: "30px",
          border: "none",
          background: " hsl(238, 40%, 52%)",
          color: "#FFFFFF",
          borderRadius: "4px",
          width: "60px",
        }}
        onClick={()=>{
            replyCommentHandler(msg)
            setMsg('')
        }}
      >
        Reply
      </button>
    </div>
    <div
    className="mobile"
      style={{
        display: "flex",
        // height: "100px",
        // width: "100%",
        padding: "12px",
        gap: "12px",
        background: "#FFFFFF",
        borderRadius: "8px",
        flexDirection:'column',
      }}
    >
     <div style={{display:'flex',gap:'12px'}}>
     <img
        src={currentUser?.image?.png ? img : ""}
        alt="No Icons"
        style={{ height: "40px", width: "40px", borderRadius: "50%" }}
      />
      <textarea
      className="textarea"
      value={msg}
      onChange={e=> setMsg(e.target.value)}
      autoFocus
        style={{
          height: "60px",
          maxHeight: "60px",
          minHeight: "60px",
        //   maxWidth: "80%",
        //   minWidth: "80%",
          padding: "12px",
        }}
      />
     </div>
     <div style={{display:'flex',gap:'12px',justifyContent:'end'}}>

      <button
        type="submit"
        style={{
          cursor: "pointer",
          height: "30px",
          border: "none",
          background: " hsl(238, 40%, 52%)",
          color: "#FFFFFF",
          borderRadius: "4px",
          width: "60px",
        }}
        onClick={()=>{
            replyCommentHandler(msg)
            setMsg('')
        }}
      >
        Reply
      </button>
     </div>
    </div>
   </>
  );
};

export default Replies;
