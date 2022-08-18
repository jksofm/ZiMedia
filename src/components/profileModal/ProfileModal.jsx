import { useState,useRef } from "react";
import { Modal, Button, Group,useMantineTheme } from "@mantine/core";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux"
import {updateMydata} from "../../features/users/userSlice"
import {useNavigate} from "react-router-dom"

function ProfileModal({ modalOpened, setModalOpend }) {
  const [opened, setOpened] = useState(false);
  const {user} = useSelector((store)=>store.user)
  // console.log(user)
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const coverImageRef = useRef();
  const profileImageRef = useRef();
  const [infouser,setInfouser] = useState({
    firstname : user.firstname || "",
    lastname : user.lastname || "",
    livesin : user.livesin || "",
    worksAt : user.worksAt || "",
    relationship : user.relationship || "",
    job : user.job || "",
  
  })
  const theme = useMantineTheme();
  const handleChange= (e)=>{
      setInfouser({...infouser,[e.target.name]: e.target.value})
   
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const updateUser = new FormData();
    updateUser.append("firstname",infouser.firstname)
    updateUser.append("lastname",infouser.lastname)
    updateUser.append("livesin",infouser.livesin)
    updateUser.append("worksAt",infouser.worksAt)
    updateUser.append("relationship",infouser.relationship)
    updateUser.append("job",infouser.job)

    if(coverImageRef.current.files[0]){

      updateUser.append("coverPicture",coverImageRef.current.files[0]);
    }
    if(profileImageRef.current.files[0]){

      updateUser.append("profilePicture",profileImageRef.current.files[0]);
    }
    dispatch(updateMydata(updateUser))
    // window.location.reload();
    

  }
  return (
   
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpend(false)}
        overlayColor={theme.colorScheme==="dark" ? theme.colors.dark[9]:theme.colors.dark[2]}
        overlayBlur = {3}
        size= "100"
      >
        <Wrapper className="infoForm" onSubmit={handleSubmit}>
          <h3>Your info</h3>
          <div className="form-control">
            <input
              type="text"
              placeholder="First Name"
              className="form-input"
              name="firstname"
              value={infouser.firstname}
              onChange= {handleChange}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Job"
              className="form-input"
              name="job"
              value={infouser.job}
              onChange= {handleChange}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Last Name"
              className="form-input"
              name="lastname"
              value={infouser.lastname}
              onChange= {handleChange}


            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Works at"
              className="form-input"
              name="worksAt"
              value={infouser.worksAt}
              onChange= {handleChange}

            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Lives in"
              className="form-input"
              name="livesin"
              value={infouser.livesin}
              onChange= {handleChange}

            />
          </div>

          <div className="form-control">
            
            <input
              type="text"
              placeholder="Relationship Status"
              className="form-input"
              name="relationship"
              value = {infouser.relationship}
              onChange= {handleChange}

            />
          </div>

          <div className="form-control">
            Cover Image
            <input
              type="file"
              ref= {coverImageRef}
              className="form-input"
              name="coverPicture"
            />
          </div>

          <div className="form-control">
            Profile Image
            <input
              type="file"
              ref= {profileImageRef}
             
              className="form-input"
              name="profilePicture"
            />
          </div>
         <button className="btn updateBtn">Update</button>
        </Wrapper>
      </Modal>
 
  );
}
const Wrapper = styled.form`
 
 .form-input {
    width: 100%;
    border: none;
    outline: none;
    background-color: var(--inputColor);
    border-radius: 8px;
    padding: 20px;
   
  }
  .form-control {
    display: grid;
    margin-bottom: 30px;
    gap: 1rem;
    width: 100%;
  }
  .updateBtn{
    padding : 0.8rem  1.5rem;
  }
`;
export default ProfileModal;
