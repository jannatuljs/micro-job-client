import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from './../../Firebase/firebase.init';
import useAxiosPublic from './../../Hooks/useAxiosPublic';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState()
    const axiosPublic = useAxiosPublic()

    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    const loginWithEmailPass = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if(currentUser){

                const token = localStorage.getItem('access-token')
                
                if(!token){

                    const userInfo = { email: currentUser.email }
                    axiosPublic.post('/jwt', userInfo)
                    .then(res =>{
                        if(res.data.token){
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false)
                        }
                    })  

                }
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
        })
        return () => unSubscribe()
    }, [axiosPublic])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        loginWithGoogle,
        loginWithEmailPass,
        createUser,
        updateUserProfile,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;