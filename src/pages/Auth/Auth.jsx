import React from "react";
import styled from "styled-components";
import Logo from "../../img/logo.png";
import { toast, ToastContainer } from "react-toastify";
import { registerUser, loginUser } from "../../features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


function Auth() {
  return (
    <>
    <ToastContainer />
    <Wrapper>
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="web-name">
          <h1>Zi Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      <div className="form">

      <Form />
      
      </div>
    </Wrapper>
    </>
  );
}
const Form = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    username: "",
    isMember: true,
  };
  const [data, setData] = React.useState(initialState);
  const dispatch = useDispatch();
const Navigate = useNavigate();


  // const navigate = useNavigate();
  const { user, isLoading } = useSelector((store) => store.user);
  React.useEffect(()=>{
    if(user){
      toast(`🦄 Welcome to Zi Media!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const timerId =setTimeout(() => {
         Navigate('/')
      }, 2000);
      return ()=>{
        clearTimeout(timerId)
      }
    }
  },[user])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const toggleMember = (e) => {
  
    // console.log("hello")
    setData((pre) => {
      return { ...pre, isMember: !data.isMember };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      password,
      confirmpassword,
      email,
      firstname,
      lastname,
      isMember,
    } = data;
    if (
      !email ||
      !password ||
      (!isMember && !username && !confirmpassword && !firstname && !lastname)
    ) {
      toast.error("Please fill out all fields");
      return;
    }
   

    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    } else {
      if (password === confirmpassword) {
        dispatch(
          registerUser({ email, password, username, firstname, lastname })
        );
        return;
      } else {
        toast.error("Your password is not the same!");
        return;
      }
    }
  };

  return (
    <SignUpWrapper>
      <form action="" onSubmit={handleSubmit} className="infoForm authForm">
        {data.isMember ? <h3>Login</h3> : <h3>Sign up</h3>}

        {!data.isMember && (
          <>
            <div className="form-control">
              <input
                name="firstname"
                type="text"
                className="form-input"
                placeholder="First Name"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                name="lastname"
                type="text"
                value={data.lastname}
                onChange={handleChange}
                className="form-input"
                placeholder="Last Name"
              />
            </div>
            <div className="form-control form-control-one">
              <input
                name="username"
                type="text"
                className="form-input"
                placeholder="User Name"
                value={data.username}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="form-control form-control-one">
          <input
            name="email"
            type="text"
            className="form-input"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        {!data.isMember ? (
          <div className="form-control">
            <input
              name="password"
              type="password"
              className="form-input"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            <input
              name="confirmpassword"
              type="password"
              className="form-input"
              placeholder="Confirm Password"
              value={data.confirmpassword}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="form-control form-control-one">
            <input
              name="password"
              type="password"
              className="form-input"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
        )}

        <div style={{ alignSelf: "flex-start", width: "100%" }}>
          {data.isMember ? (
            <>
              <span width={{ width: "100%" }}>
                Don't have an account!
                <span onClick={toggleMember} className="form-text">
                  {" "}
                  Sign Up.
                </span>
              </span>
            </>
          ) : (
            <>
              <span width={{ width: "100%" }}>
                Already have an account.
                <span onClick={toggleMember} className="form-text">
                  {" "}
                  Login!
                </span>
              </span>
            </>
          )}
        </div>
        {data.isMember ? (
          

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>

      
        
        ) : (
         

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn submit-btn"
            disabled={isLoading}

          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        
          
        )}
      </form>
      <div className="test-user">

      <button
      style={{
        margin: "0 50%"
      }}
           
           onClick={()=>{
              dispatch(loginUser({email :"test@gmail.com",password:"elegant501998"}))
           }}
           className="btn submit-btn"
         
         >
             Test User
         </button>
      </div>
    
    </SignUpWrapper>
  );
};
const SignUpWrapper = styled.div`
 
    .test-user{
      transform: translateY(-73px) translateX(-50px);
    }
  .infoForm {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.5rem;
    /* background-color: white;
    padding: 5rem; */
    width: 100%;
    border-radius: 1rem;
  }
  .form-text {
    color: var(--orange);
    cursor: pointer;
    font-weight: bold;
  }
  .authForm {
    background-color: var(--cardColor);
    padding-right: 5rem;
    padding-left: 2.5rem;
    padding-bottom: 2.5rem;
    padding-top: 1.5rem;
  }

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
    grid-template-columns: auto auto;
    gap: 3rem;
    width: 100%;
  }
  .form-control-one {
    grid-template-columns: auto;
  }
`;
const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto;

  justify-content: center;
  height: 100vh;
  gap: 4rem;
  @media screen and (min-width: 1024px) {
    .a-left {
    display: flex!important;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    img {
      align-self: center;
      width: 4rem;
      height: 4rem;
    }
  }
   }
   .a-left {
    display: none;
   
  }



  .web-name > h1 {
    font-size: 3rem;
    background-color: red;
    background-image: var(--buttonBg);
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }
  .web-name > h6 {
    font-size: 0.85rem;
  }
  .submit-btn {
    width: 6rem;
    height: 2rem;
    align-self: flex-end;
  }
`;

export default Auth;
