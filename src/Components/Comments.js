import React, { useEffect, useState } from "react";
import { ReactComponent as Reply } from "./images/icon-reply.svg";
import { ReactComponent as Edit } from "./images/icon-edit.svg";
import { ReactComponent as Delete } from "./images/icon-delete.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_IS_EDIT,
  SET_IS_REPLYING,
  SET_REPLYING_TO,
} from "../store/reducers/CommentsReducer";
const CommentsPage = ({
  details,
  isReply = false,
  minusScoreHandler,
  deleteHandler,
  editHandler,
  id,
  index,
}) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.UserReducer);
  const { isReplying, isEdit, ReplyingTo } = useSelector(
    (store) => store.CommentsReducer
  );
  const [img, setImg] = useState("");
  const [editmsg, setEditMsg] = useState("");
  async function loadImage(imageName) {
    let img = await import(`${imageName}`);
    setImg(img.default);
    // return img.default;
  }
  useEffect(() => {
    if (JSON.stringify(details.user) !== "{}") {
      loadImage(details.user?.image?.png);
    }
  }, [details.user]);
  const ReplyHandler = () => {
    dispatch({
      type: SET_REPLYING_TO,
      payload: {
        ...details,
        isReplyData: isReply,
        idData: id,
        indexData: index,
      },
    });
    dispatch({ type: SET_IS_REPLYING, payload: true });
  };
  const editHander = () => {
    setEditMsg(
      `${isReply ? `@${details?.replyingTo}, ` : ""}${details.content}`
    );
    dispatch({
      type: SET_REPLYING_TO,
      payload: {
        ...details,
        isReplyData: isReply,
        idData: id,
        indexData: index,
      },
    });
    dispatch({ type: SET_IS_EDIT, payload: true });
  };
  const CancelHandler = () => {
    dispatch({ type: SET_IS_REPLYING, payload: false });
    dispatch({ type: SET_IS_EDIT, payload: false });
    dispatch({ type: SET_REPLYING_TO, payload: {} });
  };
  const onChangeHandler = (e) => {
    setEditMsg(e.target.value);
  };
  const editHandlerData =()=>{
    const newValue = editmsg?.trim()?.split(',')
    newValue.splice(0,1)
    console.log(newValue)
    editHandler(newValue?.join(','),details,id,isReply,index);
  }
  return (
   <>
  
    <div
    className="pcView"
      style={{
        display: "flex",
        background: "#FFFFFF",
        borderRadius: "4px",
        padding: "16px",
        gap: "12px",
      }}
    >
      <div className="number">
        <span
          className="minus"
          onClick={() =>
            minusScoreHandler("minus", details, id, isReply, index)
          }
        >
          -
        </span>
        <input type="text" value={details?.score ?? "0"} disabled />
        <span
          className="plus"
          onClick={() => minusScoreHandler("plus", details, id, isReply, index)}
        >
          +
        </span>
        {/* <CommentsPage/> */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              width: "auto",
            }}
          >
            <img
              src={details.user?.image?.png ? img : ""}
              alt="No Icons"
              style={{ height: "25px", width: "25px", borderRadius: "50%" }}
            />
            <p
              style={{
                fontSize: "13px",
                textAlign: "left",
                color: "#111",
                fontWeight: 600,
                margin: "0px",
              }}
            >
              {details.user.username}
            </p>

            {currentUser?.username === details?.user?.username ? (
              <p
                style={{
                  fontSize: "12px",
                  textAlign: "left",
                  color: "#ffffff",
                  background: " hsl(238, 40%, 52%)",
                  fontWeight: 400,
                  margin: "0px",
                  padding: "3px",
                  borderRadius: "4px",
                }}
              >
                you
              </p>
            ) : null}
            <p
              style={{
                fontSize: "12px",
                textAlign: "left",
                color: "hsl(211, 10%, 45%)",
                fontWeight: 400,
                margin: "0px",
              }}
            >
              {details?.createdAt}
            </p>
          </div>
          {currentUser?.username === details?.user?.username ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "end",
              }}
            >
              <button
                type="submit"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                  height: "30px",
                }}
                disabled={isReplying || isEdit}
                onClick={() => deleteHandler(details, id, isReply, index)}
              >
                <Delete />
                <p
                  style={{
                    fontSize: "13px",
                    textAlign: "left",
                    color: "hsl(358, 79%, 66%)",
                    fontWeight: 700,
                    margin: "0px",
                  }}
                >
                  Delete
                </p>
              </button>
              {isEdit && details.id === ReplyingTo.id ? (
                <button
                  type="submit"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    height: "30px",
                  }}
                  onClick={() => {
                    CancelHandler();
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      textAlign: "left",
                      color: "hsl(238, 40%, 52%)",
                      fontWeight: 700,
                      margin: "0px",
                    }}
                  >
                    Cancel
                  </p>
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    height: "30px",
                  }}
                  disabled={isReplying || isEdit}
                  onClick={() => {
                    editHander();
                  }}
                >
                  <Edit />
                  <p
                    style={{
                      fontSize: "13px",
                      textAlign: "left",
                      color: "hsl(238, 40%, 52%)",
                      fontWeight: 700,
                      margin: "0px",
                    }}
                  >
                    Edit
                  </p>
                </button>
              )}
            </div>
          ) : (
            <>
              {isReplying && details.id === ReplyingTo.id ? (
                <button
                  type="submit"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    height: "30px",
                  }}
                  onClick={() => {
                    CancelHandler();
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      textAlign: "left",
                      color: "hsl(238, 40%, 52%)",
                      fontWeight: 700,
                      margin: "0px",
                    }}
                  >
                    Cancel
                  </p>
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    height: "30px",
                  }}
                  disabled={isReplying || isEdit}
                  onClick={() => ReplyHandler()}
                >
                  <Reply />
                  <p
                    style={{
                      fontSize: "13px",
                      textAlign: "left",
                      color: "hsl(238, 40%, 52%)",
                      fontWeight: 700,
                      margin: "0px",
                    }}
                  >
                    Reply
                  </p>
                </button>
              )}
            </>
          )}
        </div>
        {isEdit && details.id === ReplyingTo.id ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <textarea
              autoFocus={editmsg?.length !== 0}
              className="textarea"
              value={editmsg}
              onChange={onChangeHandler}
              style={{
                height: "50px",
                maxHeight: "50px",
                minHeight: "50px",
                padding: "12px",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="submit"
                style={{
                  border: "none",
                  background: "hsl(238, 40%, 52%)",
                  cursor: "pointer",
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                  height: "30px",
                  width: "70px",
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                 editHandlerData()
                  CancelHandler();
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    textAlign: "left",
                    color: "#FFFFFF",
                    fontWeight: 700,
                  }}
                >
                  Update
                </p>
              </button>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: "13px", textAlign: "left", padding: "0px" }}>
            {isReply ? (
              <span
                style={{
                  color: "hsl(238, 40%, 52%)",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginRight: "7px",
                }}
              >
                @{details?.replyingTo}
              </span>
            ) : null}
            {details?.content}
          </p>
        )}
        
      </div>
    </div>
     {/* mobile */}
    <div
    className="mobile"
      style={{
        display: "flex",
        background: "#FFFFFF",
        borderRadius: "4px",
        padding: "16px",
        flexDirection: "column",
        gap: "12px",
      }}
    >
     
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              width: "auto",
            }}
          >
            <img
              src={details.user?.image?.png ? img : ""}
              alt="No Icons"
              style={{ height: "25px", width: "25px", borderRadius: "50%" }}
            />
            <p
              style={{
                fontSize: "13px",
                textAlign: "left",
                color: "#111",
                fontWeight: 600,
                margin: "0px",
              }}
            >
              {details.user.username}
            </p>

            {currentUser?.username === details?.user?.username ? (
              <p
                style={{
                  fontSize: "12px",
                  textAlign: "left",
                  color: "#ffffff",
                  background: " hsl(238, 40%, 52%)",
                  fontWeight: 400,
                  margin: "0px",
                  padding: "3px",
                  borderRadius: "4px",
                }}
              >
                you
              </p>
            ) : null}
            <p
              style={{
                fontSize: "12px",
                textAlign: "left",
                color: "hsl(211, 10%, 45%)",
                fontWeight: 400,
                margin: "0px",
              }}
            >
              {details?.createdAt}
            </p>
          </div>
         
        </div>
        {isEdit && details.id === ReplyingTo.id ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <textarea
              autoFocus={editmsg?.length !== 0}
              className="textarea"
              value={editmsg}
              onChange={onChangeHandler}
              style={{
                height: "50px",
                maxHeight: "50px",
                minHeight: "50px",
                padding: "12px",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="submit"
                style={{
                  border: "none",
                  background: "hsl(238, 40%, 52%)",
                  cursor: "pointer",
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                  height: "30px",
                  width: "70px",
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                 editHandlerData()
                  CancelHandler();
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    textAlign: "left",
                    color: "#FFFFFF",
                    fontWeight: 700,
                  }}
                >
                  Update
                </p>
              </button>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: "13px", textAlign: "left", padding: "0px" }}>
            {isReply ? (
              <span
                style={{
                  color: "hsl(238, 40%, 52%)",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginRight: "7px",
                }}
              >
                @{details?.replyingTo}
              </span>
            ) : null}
            {details?.content}
          </p>
        )}
      </div>
      <div style={{display:'flex',gap:'10px',justifyContent:'space-between'}}>
      <div className="number" style={{display:'flex' ,alignItems:'center'}}>
        <span
          className="minus"
          onClick={() =>
            minusScoreHandler("minus", details, id, isReply, index)
          }
        >
          -
        </span>
        <input type="text" value={details?.score ?? "0"} disabled />
        <span
          className="plus"
          onClick={() => minusScoreHandler("plus", details, id, isReply, index)}
        >
          +
        </span>
        {/* <CommentsPage/> */}
      </div>
      {currentUser?.username === details?.user?.username ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "end",
              }}
            >
              <button
                type="submit"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                  height: "30px",
                }}
                disabled={isReplying || isEdit}
                onClick={() => deleteHandler(details, id, isReply, index)}
              >
                <Delete />
                <p
                  style={{
                    fontSize: "13px",
                    textAlign: "left",
                    color: "hsl(358, 79%, 66%)",
                    fontWeight: 700,
                    margin: "0px",
                  }}
                >
                  Delete
                </p>
              </button>
              {isEdit && details.id === ReplyingTo.id ? (
                <button
                  type="submit"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    height: "30px",
                  }}
                  onClick={() => {
                    CancelHandler();
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      textAlign: "left",
                      color: "hsl(238, 40%, 52%)",
                      fontWeight: 700,
                      margin: "0px",
                    }}
                  >
                    Cancel
                  </p>
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    height: "30px",
                  }}
                  disabled={isReplying || isEdit}
                  onClick={() => {
                    editHander();
                  }}
                >
                  <Edit />
                  <p
                    style={{
                      fontSize: "13px",
                      textAlign: "left",
                      color: "hsl(238, 40%, 52%)",
                      fontWeight: 700,
                      margin: "0px",
                    }}
                  >
                    Edit
                  </p>
                </button>
              )}
            </div>
          ) : (
            <>
              {isReplying && details.id === ReplyingTo.id ? (
                <button
                  type="submit"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    height: "30px",
                  }}
                  onClick={() => {
                    CancelHandler();
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      textAlign: "left",
                      color: "hsl(238, 40%, 52%)",
                      fontWeight: 700,
                      margin: "0px",
                    }}
                  >
                    Cancel
                  </p>
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    height: "30px",
                  }}
                  disabled={isReplying || isEdit}
                  onClick={() => ReplyHandler()}
                >
                  <Reply />
                  <p
                    style={{
                      fontSize: "13px",
                      textAlign: "left",
                      color: "hsl(238, 40%, 52%)",
                      fontWeight: 700,
                      margin: "0px",
                    }}
                  >
                    Reply
                  </p>
                </button>
              )}
            </>
          )}
      </div>
    
    </div>
   </>
  );
};

export default CommentsPage;
