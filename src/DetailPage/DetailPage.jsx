import React from "react";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { useEffect, useState, useRef } from "react";
import Link from "react-router-dom/Link";
// import React and DatePicker
import DatePicker from "react-datepicker";
import { authHeader } from "../_helpers";
import axios from "axios";
// import required css from library
import "react-datepicker/dist/react-datepicker.css";
const API_URL = process.env.REACT_APP_API_URL;

function DetailPage(props) {
  const [displaySaveButton, setDisplaySaveButton] = useState();
  const [editing, setEditing] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const dobRef = useRef();
  var [dobDate, setDobDate] = useState(new Date());

  const maleRef = useRef();
  const femaleRef = useRef();

  useEffect(() => {
    setDisplaySaveButton(true);
    props.dispatch(
      userActions.find(parseInt(window.location.pathname.split("/").pop()))
    );
    return () => {
      setSelectedFile(undefined)
      setPreview(undefined);
    }
  }, []);

  
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setDisplaySaveButton(true);
    console.log(displaySaveButton);
    setSelectedFile(e.target.files[0]);
  };

  //DOB
  
  useEffect(() => {
    if (props.find.items != undefined && props.find.items.DOB != undefined ) {
      const date = new Date(props.find.items.DOB);
      setDobDate(date);
      if(editing==true){
        dobRef.current.selected = dobDate;
        console.log(dobDate);
      }
      
    }
  }, [props]);

  //Gender

  
  useEffect(() => {
    if (props.find.items != null && editing== true) {

      console.log(props.find.items.gender);
      if (props.find.items.gender == "Male") {
        maleRef.current.checked = true;
      } else if (props.find.items.gender == "Female") {
        femaleRef.current.checked = true;
      }
    }
  }, [editing]);

  //submit onclick
  const submitUser = (e) => {
    // e.preventDefault();
    var gender = "";
    if (maleRef.current.checked == true) {
      gender = "Male";
    } else if (
      maleRef.current.checked == false &&
      femaleRef.current.checked == true
    ) {
      gender = "Female";
    } else {
      gender = "";
    }
    props.dispatch(userActions.update(props.find.items.id, dobDate, gender));
    alert("Form submited");
  };

  //get existing Profile Img
  useEffect(() => {
    if (props.find.items != null && props.find.items.profileImg != undefined) {
      console.log(props.find.items.profileImg);
      const options = {
        method: "GET",
        headers: {
          Authorization: authHeader(1).Authorization,
        },
      };
      fetch(API_URL + "/users/user/" + props.find.items.id + "/img", options)
        .then((response) => response.blob())
        .then((imageBlob) => {
          // Then create a local URL for that image and print it
          setSelectedFile(imageBlob);
        });
      setDisplaySaveButton(false);
      return;
    }
  }, [props]);

  //Save Img onclick
  const saveImgRef = useRef();

  const saveImg = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", selectedFile);
    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: authHeader(1).Authorization,
      },
    };
    fetch(API_URL + "/users/user/" + props.find.items.id + "/img", options);
    alert("Profile Img saved!");
    setDisplaySaveButton(false);
  };

  //edit
  const editAction = (e) => {
    e.preventDefault();
    setEditing(!editing); 
  };

  //render
  return (
    <div>
      <p>Username: {props.find.items && props.find.items.username}</p>
      {editing && (
        <form>
          <label for="image">Chose new Image</label>
          <input
            name="image"
            type="file"
            onChange={onSelectFile}
            accept="image/*"
          ></input>
          {!selectedFile && <p>No profile image</p>}
          {selectedFile && <img src={preview} height={200} width={200}  className="align-self-end mr-3"/>}

          {displaySaveButton && (
            <input
              type="submit"
              value={"Save"}
              ref={saveImgRef}
              onClick={saveImg}
            ></input>
          )}
        </form>
      )}

      {!editing && (
        <form>
          {!selectedFile && <p>No profile image</p>}
          {selectedFile && <img src={preview} height={200} width={200}  className="align-self-end mr-3"/>}
        </form>
      )}

      {!editing && (
        <form>
          <div className="card-body">
            <div className="form-group">
              <label>DOB:</label>
              {dobDate.toDateString()}
            </div>
            {/* <label>Gender</label> */}
            <div className="form-group">
              <label>Gender:</label>
              {props.find.items && props.find.items.gender}
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={editAction}>
              Edit
            </button>
            {/* <button className="btn btn-success" onClick={submitUser}>
              Submit
            </button> */}
          </div>
        </form>
      )}

      {editing && (
        <form>
          <div className="card-body">
            <div className="form-group">
              <label>DOB:</label>
              <DatePicker
                selected={dobDate}
                showDateMonthYearPicker
                showYearDropdown
                onChange={(date) => setDobDate(date)}
                ref={dobRef}
              />
            </div>
            <label>Gender</label>
            <div className="form-group">
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    id="optionsRadios1"
                    value="option1"
                    ref={maleRef}
                  />
                  Male
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    id="optionsRadios2"
                    value="option2"
                    ref={femaleRef}
                  />
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
              Cancel Edit
            </button>
            {/* Modal */}
            <div
              className="modal fade"
              id="exampleModal"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      No changes will be saved! Proceed?
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {/* <div className="modal-body"></div> */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                    >
                      Continue to edit
                    </button>
                    <button type="submit" className="btn btn-danger">
                      Delete all changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn btn-success" onClick={submitUser}>
              Submit
            </button>
          </div>
        </form>
      )}
      <Link to={{ pathname: `../../users` }}>
      Back to the List
    </Link>
    </div>
  );
}

function mapStateToProps(state) {
  const { find } = state;
  return {
    find,
  };
}

const connectedDetailPage = connect(mapStateToProps)(DetailPage);
export { connectedDetailPage as DetailPage };
