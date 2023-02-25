import { t } from 'i18next';
import avatar from '../../assets/images/avatar.png';

function Profile() {
  return (
    <div className="flex items-center gap-4 flex-wrap bg-profile-dark text-white font-poppins text-xs p-3">
      <img src={avatar} alt="avatar-image" />
      <div className="space-y-3">
        <p>837403080JCJ23E3433</p>
        <p>{t('profile.description')}</p>
      </div>
    </div>
  );
}

export default Profile;
