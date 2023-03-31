import { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import {auth, registerWithEmailAndPassword} from "../auth/firebase";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate()

    const register= () => {
        if(!name) alert("Please enter name")
        registerWithEmailAndPassword(name, email, password)
    }
    useEffect(() => {
        if(loading) return;
        if(user) navigate("/countries");
    },[user, loading, navigate])
   
    return(
        <div>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder = "Full name"
            />
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder = "Email"
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder = "Password"
            />
            <Button onClick={register}>Register</Button>
            <div>
                Already have a account?
                <Link to={"/login"}>Login</Link> now
            </div>
        </div>
    )
}

export default Register 