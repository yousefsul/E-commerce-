import React , {useState , useEffect} from 'react';
import {auth, GoogleAuthProvider} from '../../firebase';
import {toast} from 'react-toastify';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import {Button} from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import {useDispatch ,useSelector} from 'react-redux';
import { Link } from "react-router-dom";

const Login = ({history}) => {
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [loading,setLoading]= useState(false)
    const {user} =useSelector((state)=> ({...state}))

    useEffect(()=>{
        if(user && user.token)
            history.push("/")
    },[user])

    
    let dispatch = useDispatch()
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()
            
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })
            history.push('/')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            setLoading(false)
        }
    }
    const googleLogin = async () => {
        auth.signInWithPopup(GoogleAuthProvider)
        .then(async (result) => {
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })
            history.push('/')
        })
        .catch((error) => {
            console.log(error.message)
            toast.error(error.message)
        })

    }
    
    const loginForm = () =><form onSubmit = {handleSubmit}>
    <div className="form-group">
    <input type="email" className= "form-control" value= {email} onChange = {e=> setEmail(e.target.value)} autoFocus placeholder= "Your Email"/>
    </div>
    <br />
    <div className="form-group">
    <input type="password" className= "form-control" value= {password} onChange = {e=> setPassword(e.target.value)} placeholder= "Your Password"/>
    </div>
    <br />
    <Button onClick={handleSubmit} type="primary" 
    className="mb-3"block shape="round" icon={<MailOutlined />} size="large" disabled={!email || password.length<6}>Login With Email/Password</Button>    
    </form>
    return(
        <div className = "container p-5">
        <div className = "row">
        <div className="col-md-4 offset-md-3">
        {loading ?   (<h4 className="text-danger">Loading ...</h4>) : (<h4>Login</h4> )  }
        {loginForm()}
        {
            <Button onClick={googleLogin} type="danger" 
            className="mb-3" block shape="round" icon={<GoogleOutlined />} size="large">Login with Google</Button>    }
            <Link to="/forget/password" className ="float-right text-danger">Forget Password</Link>
            </div>
            </div>
            </div>
            )
            
            
        }
        
        export default Login;
        
        
        
        