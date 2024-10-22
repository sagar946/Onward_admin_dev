import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "../Components/AdminPanel/Pages/AdminDashboard/AdminDashboard";
import AdminLayout from "../Components/AdminPanel/AdminLayout/AdminLayout";
import PNF from "../Layout/PNF/PNF";
import AdminLogin from "../Components/AdminPanel/Pages/AdminLogin/AdminLogin";
import AdminRegister from "../Components/AdminPanel/Pages/AdminRegister/AdminRegister";
import ProtectedRoute from "./ProtectedRoute";
import UserDetails from "../Components/AdminPanel/Pages/UserDetails/UserDetails";
import CreateDonation from "../Components/AdminPanel/Pages/AdminDonation/CreateDonation";
import ReadDonation from "../Components/AdminPanel/Pages/AdminDonation/ReadDonation";
import UpdateDonation from "../Components/AdminPanel/Pages/AdminDonation/UpdateDonation";
import DonationHistory from "../Components/AdminPanel/Pages/AdminDonation/DonationHistory";
import CreateReason from "../Components/AdminPanel/Pages/MigraineReason/CreateReason";
import ViewReasons from "../Components/AdminPanel/Pages/MigraineReason/ViewReasons";
import CreateForum from "../Components/AdminPanel/Pages/Forum/CreateForum";
import ForumList from "../Components/AdminPanel/Pages/Forum/ForumList";
import SingleForumList from "../Components/AdminPanel/Pages/Forum/SingleForumList";
import UpdateFormPost from "../Components/AdminPanel/Pages/Forum/UpdateForumPost";
import DisplayComments from "../Components/AdminPanel/Pages/Forum/DisplayComments";
import CreateComment from "../Components/AdminPanel/Pages/Forum/CreateComment";
import AcceptRejectComment from "../Components/AdminPanel/Pages/Forum/AcceptRejectComment";
import CreateBlog from "../Components/AdminPanel/Pages/Blogs/CreateBlog";
import ViewBlogs from "../Components/AdminPanel/Pages/Blogs/ViewBlogs";
import CreateInsight from "../Components/AdminPanel/Pages/Insights/CreateInsight";
import ViewInsights from "../Components/AdminPanel/Pages/Insights/ViewInsights";
import UpdateBlog from "../Components/AdminPanel/Pages/Blogs/UpdateBlog";
import UpdateInsight from "../Components/AdminPanel/Pages/Insights/UpdateInsight";
import CreatePosition from "../Components/AdminPanel/Pages/MigrainePositions/CreatePosition";
import ViewPositions from "../Components/AdminPanel/Pages/MigrainePositions/ViewPositions";




const RootRouting = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* This Is Admin layout */}
          <Route path="admin" element={<ProtectedRoute element={AdminLayout} />}>
            {/* These Are Child Routes */}
              <Route index path="" element={<ProtectedRoute element={AdminDashboard} />}/>
              <Route path="dashboard" element={<ProtectedRoute element={AdminDashboard} />}/>
              <Route path="user" element={<ProtectedRoute element={UserDetails} />} />
              <Route path="create" element={<ProtectedRoute element={CreateDonation} />}/>
              <Route path="read" element={<ProtectedRoute element={ReadDonation} />}/>
              <Route path="donation-history/:id" element={<ProtectedRoute element={DonationHistory} />} />
              <Route path="create-reason" element={<ProtectedRoute element={CreateReason} />} />
              <Route path="view-reasons" element={<ProtectedRoute element={ViewReasons} />} />
              <Route path="create-forum" element={<ProtectedRoute element={CreateForum} />} />
              <Route path="forum-list" element={<ProtectedRoute element={ForumList} />} />
              <Route path="forum-list/:id" element={<ProtectedRoute element={SingleForumList} />} />
              <Route path="forum-update/:id" element={<ProtectedRoute element={UpdateFormPost} />} />
              <Route path="forum-comments/:id" element={<ProtectedRoute element={DisplayComments} />} />
              <Route path="create-comment/:id" element={<ProtectedRoute element={CreateComment} />} />
              <Route path="moderate-comments/:id" element={<ProtectedRoute element={AcceptRejectComment} />} />
             

              <Route path="create-blog" element={<ProtectedRoute element={CreateBlog} />} />
              <Route path="view-blogs" element={<ProtectedRoute element={ViewBlogs} />} />
              <Route path="create-insight" element={<ProtectedRoute element={CreateInsight} />} />
              <Route path="view-insights" element={<ProtectedRoute element={ViewInsights} />} />
              <Route path="create-position" element={<ProtectedRoute element={CreatePosition} />} />
              <Route path="view-positions" element={<ProtectedRoute element={ViewPositions} />} />



          </Route>
          {/* Update Donation Route */}
          <Route path="/update/:id" element={<ProtectedRoute element={UpdateDonation} />} />
          <Route path="/update-blog/:id" element={<ProtectedRoute element={UpdateBlog} />} />
          <Route path="/update-insight/:id" element={<ProtectedRoute element={UpdateInsight} />} />
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route path="adminregister" element={<AdminRegister />} />
          <Route path="*" element={<PNF />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RootRouting;
