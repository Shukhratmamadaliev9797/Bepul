import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, listPosts } from "../../actions/postActions";
import Loader from "../../components/general/Loader";
import { Message } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  POST_DELETE_RESET,
  POST_UPDATE_RESET,
} from "../../constants/postConstants";
import Delete from "../../modals/public/Delete";

export default function MyPosts() {
  const [title, setTitle] = useState("All");
  const [category, setCategory] = useState("All");
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activePost, setActivePost] = useState();

  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const {
    loading: listLoading,
    error: listError,
    postLists, 
    pages,
    page,
  } = postList;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const postCreate = useSelector((state) => state.postCreate);
  const { success: successCreate, successMessage } = postCreate;

  const postUpdate = useSelector((state) => state.postUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = postUpdate;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete;

  const [user, setUser] = useState(userInfo._id);
  const notifyError = (message) => toast.error(message);
  const notifySuccessCreate = (message) => toast.success(message);

  useEffect(() => {
    dispatch(
      listPosts({
        pageNumber,
        pageSize: 15,
        title: title !== "All" ? title : "",
        category: category !== "All" ? category : "",
        user: user !== "All" ? user : "",
      })
    );

    if (userInfo) {
      setUser(userInfo._id);
    }
    if (successCreate) {
      notifySuccessCreate(successMessage);
    }
    if (updateSuccess) {
      dispatch({ type: POST_UPDATE_RESET });
    }
    if (successDelete) {
      setDeleteModal(false);
      dispatch({ type: POST_DELETE_RESET });
    }
    if (updateError || errorDelete) {
      notifyError(updateError || errorDelete);
    }
  }, [
    dispatch,
    title,
    category,
    updateSuccess,
    user,
    userInfo,
    pageNumber,
    successCreate,
    successMessage,
    successDelete,
    updateError,
    errorDelete,
  ]);

  const postDeleteHandler = () => {
    dispatch(deletePost(activePost._id));
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="snackbar"
      />
      <Delete
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        action={postDeleteHandler}
        loading={loadingDelete}
      />
      {listLoading ? (
        <Loader height={80} />
      ) : listError ? (
        <Message showIcon type="error" header="Error">
          {listError}
        </Message>
      ) : (
        <div className="profileEdit">
          <div className="profileEdit__title">
            <h3>My Posts</h3>
          </div>
          <div className="myPosts__tableContainer">
            {postLists.length <= 0 ? (
              <Message showIcon type="warning" header="Warning">
                Opps, There is no any posts
              </Message>
            ) : (
              <table className="myPosts__table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Condition</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {postLists.map((post) => {
                    return (
                      <tr>
                        <td>#{post._id.substring(0, 4)}</td>
                        <td>
                          <img src={post.image1} alt="" />
                        </td>
                        <td>{post.title}</td>
                        <td>{post.category}</td>
                        <td>{post.condition}</td>
                        <td>{post.createdAt.substring(0, 10)}</td>
                        <td>
                          <Link to={`/profile/edit-post/${post._id}`}>
                            <i class="myPosts__editIcon fa-solid fa-pen-to-square"></i>
                          </Link>

                          <i
                            onClick={() => {
                              setActivePost(post);
                              setDeleteModal(true);
                            }}
                            class="myPosts__delete fa-solid fa-trash-can"
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
}
