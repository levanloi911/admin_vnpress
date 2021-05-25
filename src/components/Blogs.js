import React, { useEffect, useState } from "react";
import BlogsForm from "./BlogsForm";

import { db } from "../firebase";
import { toast } from "react-toastify";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getBlogs = async () => {
    db.collection("Blogs").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setBlogs(docs);
    });
  };

  const onDeleteBlog = async (id) => {
    if (window.confirm("are you sure you want to delete this blog?")) {
      await db.collection("Blogs").doc(id).delete();
      toast("Blog Removed Successfully", {
        type: "error",
        autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const addOrEditBlog = async (blogObject) => {
    try {
      if (currentId === "") {
        await db.collection("Blogs").doc().set(blogObject);
        toast("New Blog Added", {
          type: "success",
        });
      } else {
        await db.collection("Blogs").doc(currentId).update(blogObject);
        toast("Link Updated Successfully", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="">
        <BlogsForm {...{ addOrEditBlog, currentId, blogs }} />
      </div>
      <div className="col-md-8 p-2">
        {blogs.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.title}</h4>
                <div>
                  <icon
                    className="material-icons text-danger"
                    onClick={() => onDeleteBlog(link.id)}>
                    close
                  </icon>
                  <i
                    className="material-icons"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p>{link.body1}</p>
              <p>{link.body2}</p>

              <a href={link.image} target="_blank" rel="noopener noreferrer">
                 <picture>
                      <img itemprop="contentUrl" loading="lazy" intrinsicsize="680x408"
                      alt="Thêm 16 ca Covid-19 cộng đồng" className="lazy loading"
                      src = { link.image}/>
                             </picture>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blogs;
