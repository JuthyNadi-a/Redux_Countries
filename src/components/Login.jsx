import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useAuthState } from "react-firebase-hooks/auth"
import {Link, useNavigate } from "react-router-dom"
import {auth, loginWithEmailAndPassword} from "../auth/firebase";

import "./Login-Register.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(() => {
        if(loading) return;
        if(user) navigate("/countries");
    },[user, loading, navigate])
    return(
        <Form className="form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email here" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password here" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button className='sign-up' onClick={() => loginWithEmailAndPassword(email,password)}>Log in</Button>
            <div>Don't have an account? 
                <Link to="/register" className="link"> Register</Link>
            </div>
        </Form>
    )
}
export  default  Login 