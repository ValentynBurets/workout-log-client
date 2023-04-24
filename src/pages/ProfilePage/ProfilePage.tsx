import React from "react";
import "./ProfilePage.sass";
import ProfileForm from "./Components/ProfileForm";
import { useParams } from "react-router-dom";

interface ProfilePageProps {}

function ProfilePage(props: ProfilePageProps) {
  const params: { id: string } = useParams();

  return (
    <div className="profile-page" style={{ minHeight: `${window.innerHeight - 205}px` }}>
      <div className="profile-container">
        {params.id ? (
          <ProfileForm isReadOnly={true} id={params.id} />
        ) : (
          <ProfileForm isReadOnly={false} id={params.id} />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
