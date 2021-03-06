import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const LinksForm = (props) => {
  const initialStateValues = {
    image: "",
    name: "",
    body1: "",
    body2: "",

  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validURL(values.image)) {
      return toast("invalid url", { type: "warning", autoClose: 1000 });
    }

    props.addOrEditBlog(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("Blogs").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(props.currentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="link image (https://someurl.xyz)"
          value={values.image}
          name = "image"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          value={values.title}
          name = "title"
          placeholder="Blog title"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <textarea
          rows="3"
          className="form-control"
          placeholder="Write a Description 1"
          name = "body1"
          value={values.body1}
          onChange={handleInputChange}
        ></textarea>
      </div>
       <div className="form-group">
        <textarea
          rows="3"
          className="form-control"
          placeholder="Write a Description 2"
          name = "body2"
          value={values.body2}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};

export default LinksForm;
