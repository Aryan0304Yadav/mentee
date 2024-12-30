import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import ProfileHeader from './ProfileHeader';
import '../styles/profile.css';
// import profileImage from '../assets/images/wlr.jpg';

const Profile = () => {
  const { prn } = useParams();
  const [userData, setUserData] = useState({
    name: '',
    PRN: '',
    branch: '',
    batch: '',
    email: '',
    mentor: '',
    phone: '',
    profilePicture: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/mentee/dashboard-fetch/${prn}`);
        setUserData({
          name: response.data.old_name,
          PRN: response.data.prn,
          branch: response.data.branch,
          batch: response.data.batch,
          email: response.data.old_student_email,
          phone: response.data.old_student_phone,
          mentor: response.data.assigned_mentor_name,
          profilePicture: response.data.profile_photo
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [prn]);

  return (
    <div className="profile">
      <ProfileHeader />
      <div className="user--profile">
        <div className="user--image">
          <img src={`http://localhost:3000${userData.profilePicture}`} alt="User Profile" />
        </div>
        <div className="user--detail">
          <div className="profile-item">
            <span className="label">Name:</span>
            <span className="value">{userData.name}</span>
          </div>
          <div className="profile-item">
            <span className="label">Phone:</span>
            <span className="value">{userData.phone}</span>
          </div>
          <div className="profile-item">
            <span className="label">Email:</span>
            <span className="value">{userData.email}</span>
          </div>
          <div className="profile-item">
            <span className="label">PRN:</span>
            <span className="value">{userData.PRN}</span>
          </div>
          <div className="profile-item">
            <span className="label">Branch:</span>
            <span className="value">{userData.branch}</span>
          </div>
          <div className="profile-item">
            <span className="label">Batch:</span>
            <span className="value">{userData.batch}</span>
          </div>
          <div className="profile-item">
            <span className="label">Mentor:</span>
            <span className="value">{userData.mentor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
