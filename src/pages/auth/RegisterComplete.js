import React , {useState ,useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';

const RegisterComplete = ({history}) => {
    const [email,setEmail]= useState("")
    const [password,SetPassword]=useState("")
    const [passwordConfirmation,SetPasswordConfirmation]=useState("")

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    },[]
    
    )

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!email || !password){
            toast.error("Email and Password is Required")
            return
        }

        if(password !== passwordConfirmation){
            toast.error("Please make sure your passwords match")
            return
        }

        if(password.length<6){
            toast.error("Password must be at least 6 characters long")
            return
        }

        try {
            const result= await auth.signInWithEmailLink(email , window.location.href) 
            if(result.user.emailVerified){
                window.localStorage.removeItem("emailForRegistration")
                let user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()
                history.push('/')


            }
        } catch (error) {
        console.log(error)    
        }

    }   

    const completeRegistrationForm = () =><form onSubmit = {handleSubmit}>
        <input type="email" className= "form-control" value= {email} disabled/>
        <br />
        <input type="password" className= "form-control" value= {password} onChange={e =>{SetPassword(e.target.value)}} autoFocus placeholder="Password"/>
        <input type="password" className= "form-control" value= {passwordConfirmation} onChange={e =>{SetPasswordConfirmation(e.target.value)}} autoFocus placeholder="Password Confirmation"/>

        <br />
        <button type="submit" className = "btn btn-raised offset-md-4">Complete Registration</button>
    </form>
    return(
        <div className = "container p-5">
            <div className = "row">
                <div className="col-md-4 offset-md-3">
                    <h4>Registr Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )


}

export default RegisterComplete;