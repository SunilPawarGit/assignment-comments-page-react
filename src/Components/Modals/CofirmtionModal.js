import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_DELETE_CONTENT,
  SET_IS_DELETE,
} from "../../store/reducers/CommentsReducer";

const CofirmtionModal = ({ deleteHandler }) => {
  const { deleteContent } = useSelector((store) => store.CommentsReducer);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch({ type: SET_IS_DELETE, payload: false });
    dispatch({ type: SET_DELETE_CONTENT, payload: {} });
  };
  const handleYes = () => {
    deleteHandler(
      deleteContent?.data,
      deleteContent?.id,
      deleteContent?.isReply,
      deleteContent?.index
    );
  };
  return (
    <div id="myModal" className="modal">
      <div className="modal-content" style={{borderRadius: "8px",}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: 700, margin: "0px" }}>
            Delete Comment
          </p>
          {/* <span className="close" onClick={() => handleCloseModal()}>
            &times;
          </span> */}
        </div>
        <p
              style={{
                fontSize: "13px",
                textAlign: "left",
                color: "hsl(211, 10%, 45%)",
                fontWeight: 500,
                // margin: "0px",
              }}
            >
             Are you sre you want to delete this comment? This will removethe comment and can't be undone.
            </p>
        <div style={{ display: "flex", justifyContent: "end", gap: "12px" }}>
          <button
            type="submit"
            style={{
              border: "none",
              background: "hsl(211, 10%, 45%)",
              cursor: "pointer",
              display: "flex",
              gap: "6px",
              alignItems: "center",
              height: "30px",
              borderRadius: "4px",
            }}
            autoFocus
            onKeyDown={e=>{
                if(e.key === 'Escape'){
                    handleCloseModal()
                }
            }}
            onClick={()=> handleCloseModal()}
          >
            <p
              style={{
                fontSize: "13px",
                textAlign: "left",
                color: "#FFFFFF",
                fontWeight: 700,
                margin: "0px",
              }}
            >
              No / Cancel
            </p>
          </button>
          <button
            type="submit"
            style={{
              border: "none",
              background: "hsl(358, 79%, 66%)",
              cursor: "pointer",
              display: "flex",
              gap: "6px",
              alignItems: "center",
              height: "30px",
              borderRadius: "4px",
            }}
            onClick={() => handleYes()}
          >
            <p
              style={{
                fontSize: "13px",
                textAlign: "left",
                color: "#FFFFFF",
                fontWeight: 700,
                margin: "0px",
              }}
            >
              Yes / Delete
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CofirmtionModal;
