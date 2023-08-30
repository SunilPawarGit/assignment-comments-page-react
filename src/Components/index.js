import React, { useEffect, useMemo, useState } from "react";
import { HttpDelete, HttpGet, HttpPost, HttpPut } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "../store/reducers/UserReducer";
import {
  SET_COMMENTS,
  SET_DELETE_CONTENT,
  SET_IS_DELETE,
  SET_IS_REPLYING,
  SET_REPLYING_TO,
} from "../store/reducers/CommentsReducer";
import { v4 as UIDV4 } from "uuid";
import CommentsPage from "./Comments";
import Replies from "./Replies";
import CofirmtionModal from "./Modals/CofirmtionModal";
const MainPage = () => {
  const { currentUser } = useSelector((store) => store.UserReducer);
  const [mesg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const { Comments, isReplying, ReplyingTo, isEdit, isDelete } = useSelector(
    (store) => store.CommentsReducer
  );
  const dispatch = useDispatch();
  //  GET Req current User
  const fetchCurrentUser = async () => {
    const res = await HttpGet("/currentUser");
    dispatch({
      type: SET_USER,
      payload: res,
    });
  };
  // Get Req All Comments
  const fetchComments = async () => {
    const res = await HttpGet("/comments");
    dispatch({
      type: SET_COMMENTS,
      payload: res,
    });
  };

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      fetchCurrentUser();
      fetchComments();
      console.log(currentUser?.image?.png);
      // const re =require(currentUser?.image?.png)
      // console.log(re)
    }
    return () => {
      isMount = false;
    };
  }, []);

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

  const minusScoreHandler = async (
    type = "",
    data = {},
    id,
    isReply = false,
    index
  ) => {
    if (
      (data.score === 0 && type === "minus") ||
      data?.user?.username === currentUser?.username ||
      isReplying
    )
      return;
    if (isReply) {
      const parentData = Comments?.filter(
        (comments) => comments.id === id
      )?.[0];
      parentData.replies[index].score =
        type === "minus"
          ? parentData.replies[index].score - 1
          : parentData.replies[index].score + 1;
       await HttpPut(`/comments/${parentData.id}`, parentData);
      
    } else {
      const parentData = Comments?.filter(
        (comments) => comments.id === id
      )?.[0];
      parentData.score =
        type === "minus" ? parentData.score - 1 : parentData.score + 1;
       await HttpPut(`/comments/${parentData.id}`, parentData);
     
    }
    fetchComments();
  };
  const sendCommentsHandler = async () => {
    if (mesg?.length === 0) return;
    let body = {
      id: UIDV4(),
      user: { ...currentUser },
      content: mesg,
      createdAt: "1 minute ago",
      score: 0,
      replies: [],
    };
    await HttpPost("/comments", body);
    setMsg("");
    fetchComments();
  };
  const replyCommentHandler = async (value = "") => {
    if (value?.length === 0) return;
    let newObject = {
      id: UIDV4(),
      user: { ...currentUser },
      content: value,
      createdAt: "1 minute ago",
      replyingTo: ReplyingTo?.user?.username,
      score: 0,
      replies: [],
    };
    const parentData = Comments?.filter(
      (comments) => comments.id === ReplyingTo?.idData
    )?.[0];
    parentData.replies = [...parentData?.replies, newObject];
    await HttpPut(`/comments/${parentData.id}`, parentData);
    // if(ReplyingTo?.isReplyData){
    // }else{

    // }
    // let body = {
    //   id: UIDV4(),
    //   user: { ...currentUser },
    //   content: mesg,
    //   createdAt: "1 minute ago",
    //   score: 0,
    //   replies: [],
    // };
    // const res = await HttpPost("/comments", body);
    setMsg("");
    fetchComments();
    dispatch({ type: SET_IS_REPLYING, payload: false });
    dispatch({ type: SET_REPLYING_TO, payload: {} });
  };
  const deleteHandler = async (data = {}, id, isReply = false, index) => {
    if (!isDelete) {
      dispatch({ type: SET_IS_DELETE, payload: true });
      dispatch({
        type: SET_DELETE_CONTENT,
        payload: { id, data, isReply, index },
      });
      return;
    }
    if (isReply) {
      const parentData = Comments?.filter(
        (comments) => comments.id === id
      )?.[0];
      parentData.replies?.splice(index, 1);
       await HttpPut(`/comments/${parentData.id}`, parentData);
     
    } else {
      // const parentData = Comments?.filter(
      //   (comments) => comments.id === id
      // )?.[0];
      // parentData.replies = parentData.replies?.filter();
      await HttpDelete(`/comments/${id}`);
  
    }
    fetchComments();
    dispatch({ type: SET_IS_DELETE, payload: false });
    dispatch({ type: SET_DELETE_CONTENT, payload: {} });
  };
  const TreeComments = (Comments = [], child = false) => {
    return Comments?.length
      ? Comments?.map((comments, ind) => (
          <div
            key={comments.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: child ? "0px" : "12px",
              marginLeft: child ? "30px" : "0px",
              paddingLeft: child ? "30px" : "0px",
              borderLeft: child ? "1px solid #D2D5" : "none",
            }}
          >
            <CommentsPage
              details={comments}
              id={comments.id}
              index={ind}
              minusScoreHandler={minusScoreHandler}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
            {isReplying && comments.id === ReplyingTo.id ? (
              <Replies replyCommentHandler={replyCommentHandler} />
            ) : null}
            {comments?.replies?.length !== 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginLeft: "30px",
                  paddingLeft: "30px",
                  borderLeft: "1px solid #D2D5",
                }}
              >
                {/* {TreeComments(comments.replies,true)} */}
                {comments.replies?.map((repliesData, index) => (
                  <div
                    key={repliesData.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <CommentsPage
                      details={repliesData}
                      id={comments.id}
                      index={index}
                      isReply={true}
                      minusScoreHandler={minusScoreHandler}
                      deleteHandler={deleteHandler}
                      editHandler={editHandler}
                    />
                    {isReplying && repliesData.id === ReplyingTo.id ? (
                      <Replies replyCommentHandler={replyCommentHandler} />
                    ) : null}
                  </div>
                ))}
              </div>
            ) : //  TreeComments(comments.replies,true)
            null}
          </div>
        ))
      : [];
  };
  const editHandler = async (value = "", data = {}, id, isReply = false,index) => {
 
    if (isReply) {
      const parentData = Comments?.filter(
        (comments) => comments.id === id
      )?.[0];
      parentData.replies[index].content = value;
     await HttpPut(`/comments/${parentData.id}`, parentData);
    } else {
      const parentData = Comments?.filter(
        (comments) => comments.id === id
      )?.[0];
      parentData.content = value;
      await HttpPut(`/comments/${parentData.id}`, parentData);
      
    }
    fetchComments();
  };
  return (
    <div
      style={{ width: "100%", height: "calc(100vh - 50px)", overflow: "auto" }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          background: "#D2D2D4",
          height: "calc(100% - 140px)",
          flexDirection: "column",
          overflow: "auto",
          gap: "12px",
          marginBottom: "10px",
        }}
      >
        {TreeComments(Comments, false)}
      </div>
      <div
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
          style={{ height: "30px", width: "30px", borderRadius: "50%" }}
        />
        <textarea
          className="textarea"
          style={{
            height: "60px",
            maxHeight: "60px",
            minHeight: "60px",
            // maxWidth:window.innerWidth < 400 ? '150px' : window.innerWidth < 700 ? '80px' :"80%",
            // minWidth: window.innerWidth < 400 ? '150px' : window.innerWidth < 700 ? '80px': "80%",
            padding: "12px",
          }}
          value={mesg}
          onChange={(e) => setMsg(e.target.value)}
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
          disabled={isEdit || isReplying}
          onClick={() => sendCommentsHandler()}
        >
          SEND
        </button>
      </div>
      {isDelete ? <CofirmtionModal deleteHandler={deleteHandler} /> : null}
    </div>
  );
};

export default MainPage;
