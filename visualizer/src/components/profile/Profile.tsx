import { t } from 'i18next';
import avatar from '/icons/avatar.svg';
import './styles.css';

type ProfileProps = {
  stellarKey: string;
};

const Profile = ({ stellarKey }: ProfileProps) => {
  return (
    <div className="profile">
      <img className="avatar" src={avatar} alt="avatar-image" />
      <div>
        <p>{stellarKey}</p>
        <p>{t('certificates.profile.description')}</p>
      </div>
    </div>
  );
};

export default Profile;
