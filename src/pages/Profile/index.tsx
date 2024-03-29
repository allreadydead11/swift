import { Link } from "react-router-dom";

import icons from "@constants/icons";
import { CLIENT_ROUTES } from "@constants/routes";
import Avatar from "@components/Avatar/Avatar";

import ProfileWrapper from "./ProfileStyle";
import useCurrentUser from "@hooks/useCurrentUser";

const Profile = () => {
  const user = useCurrentUser();

  return (
    <>
      <ProfileWrapper>
        <div className="top-profile-wrapper">
          <div className="profile-title">
            <div className="profile-image">
              <Link to={CLIENT_ROUTES.editAccount}>
                <Avatar />
              </Link>
            </div>

            {user.isLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="profile-name">Hello, {user.data?.first_name}</div>
            )}
            {user.isError && <div>Error occurred while fetching user data</div>}
          </div>
          <div className="settings-icon">
            <Link to={CLIENT_ROUTES.editAccount}>{icons.settingIcon()}</Link>
          </div>
        </div>

        <div className="profile-buttons">
          <div className="profile-btn">
            <div className="btn-icon">{icons.dollarIcon()}</div>
            <div className="btn-content">
              <p className="heading">Total Assets</p>
              <p className="sub-heading">View your total assets and earnings</p>
            </div>
          </div>

          <div className="profile-btn">
            <div className="btn-icon">{icons.transactionIcon()}</div>
            <div className="btn-content">
              <p className="heading">Transaction History</p>
              <p className="sub-heading">View details of transactions</p>
            </div>
          </div>

          <Link to={CLIENT_ROUTES.liveChat}>
            <div className="profile-btn">
              <div className="btn-icon">{icons.userIcon()}</div>
              <div className="btn-content">
                <p className="heading">Customer Service</p>
                <p className="sub-heading">seek support from us</p>
              </div>
            </div>
          </Link>

          <div className="profile-btn">
            <div className="btn-icon">{icons.starIcon()}</div>
            <div className="btn-content">
              <p className="heading">Rate Us</p>
              <p className="sub-heading">Rate our App</p>
            </div>
          </div>
        </div>
      </ProfileWrapper>
    </>
  );
};
export default Profile;
