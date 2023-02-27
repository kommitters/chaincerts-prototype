import { t } from 'i18next';
import avatar from '/icons/avatar.svg';

function Profile() {
  return (
    <div className="profile">
      <img className="avatar" src={avatar} alt="avatar-image" />
      <div>
        <p>837403080JCJ23E3433</p>
        <p>{t('certificates.profile.description')}</p>
      </div>
    </div>
  );
}

export default Profile;
