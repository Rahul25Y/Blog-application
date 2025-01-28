import './App.css';
import { Login } from './MyBlogapp/components/auth/Login';
import { Protected_route } from './MyBlogapp/components/protected/Protected_route';
import { Page404 } from './MyBlogapp/components/Page404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './MyBlogapp/components/auth/Signup';
import { BlogsList } from './MyBlogapp/components/blog/BlogsList';
import { AddBlog } from './MyBlogapp/components/blog/AddBlog';
import { BlogDetails } from './MyBlogapp/components/blog/BlogDetails';
import { AddComments } from './MyBlogapp/components/blog/AddComments';
import { Navbar } from './MyBlogapp/navbar/Navbar';
import { ForgetPassword } from './MyBlogapp/components/auth/ForgetPassword';
import { ResetPassword } from './MyBlogapp/components/auth/ResetPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup/' element={<Signup/>}></Route>
          <Route path='/Navbar/' element={<Protected_route Component={Navbar}/>}></Route>
          <Route path='/createBlog/' element={<Protected_route Component={AddBlog}/>}></Route>
          <Route path='/blogList/' element={<Protected_route Component={BlogsList}/>}></Route>
          <Route path='/blogdetails/:id' element={<BlogDetails/>}></Route>
          <Route path='/addcomment/:id' element={<AddComments/>}></Route>
          <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>
          <Route path='/user/reset-password/:id/:token' element={<ResetPassword/>}></Route>
          <Route path='/*' element={<Page404/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
