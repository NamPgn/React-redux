import React, { createContext, useContext, useEffect, useState } from 'react'
import { urlSwr } from '../function';
import { useSWRWithAxios } from '../hook/Swr';
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
//   getAuth,
//   FacebookAuthProvider
// } from "firebase/auth";
// import { auth } from '../firebase'
// const AuthContext = createContext(null);
// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser]: any = useState(null);
//   const [showLoginSuccess, setShowLoginSuccess] = useState(false);
//   const googleSignin = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//   }
//   const facebookSignin = () => {
//     const provider = new FacebookAuthProvider();
//     signInWithPopup(auth, provider)
//   }
//   const logOut = () => {
//     signOut(auth);
//     localStorage.removeItem('token');
//     setShowLoginSuccess(false);
//     setUser(null);
//   }
//   useEffect(() => {
//     const ussubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser !== null && !showLoginSuccess) {
//         message.success('Login successfully');
//         setShowLoginSuccess(true);
//       }
//       // const { token }: any = currentUser.getIdTokenResult();
//       // const customClaims = {
//       //   ...user,
//       //   displayName: token.displayName,
//       //   photoURL: user.photoURL,
//       //   cart: [],
//       //   role: 0
//       // };
//       // await currentUser.getIdToken(true);
//     });
//     return () => {
//       ussubscribe();
//     };
//   }, [user]);

//   return <AuthContext.Provider value={{ googleSignin, user, logOut, facebookSignin }}>
//     {/* //cung cấp cho mấy thằng router thì gọi thằng childrent */}
//     {children}
//   </AuthContext.Provider>
// }
// export const UserAuth = () => {
//   return useContext(AuthContext)
// }

export const MyContext = createContext(null);
export const MyContextProvider = (props) => {
  const { data: category, isLoading } = useSWRWithAxios(urlSwr + `/categorys`);
  const { data: seri, isLoading: loadingSeri } = useSWRWithAxios(urlSwr + `/types`);
  const { data: categorymain, isLoading: LoadingCateMain, isError } = useSWRWithAxios(urlSwr + `/categorymain`);
  const value = {
    //danh mục phim nhiều tập
    category,
    isLoading,
    //sibarr
    seri,
    loadingSeri,
    //phim lẻ phim 1 tập
    categorymain,
    LoadingCateMain,
    isError,
  }
  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  )
}




export const ChangeContext = createContext(null);

export const ChangeContextProvider = (props) => {
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState(!state);
  }

  var value = {
    handleClick,
    state
  }
  return <ChangeContext.Provider value={value}>
    {props.children}
  </ChangeContext.Provider>
}