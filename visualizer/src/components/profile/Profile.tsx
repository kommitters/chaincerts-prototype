import { t } from 'i18next';
import avatar from '/icons/avatar.svg';
import './styles.css';

type ProfileProps = {
  stellarKey: string;
};

const Profile = ({ stellarKey }: ProfileProps) => {
  return (
    <>
      <div className="flex items-center justify-center gap-x-3 bg-hight-dark h-24 w-full mx-auto p-3 rounded-lg lg:w-5/6 text-white">
        <img src={avatar} alt="avatar-image" />
        <div>
          <p className="break-all">{stellarKey}</p>
          <p>{t('certificates.profile.description')}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
