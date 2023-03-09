import { t } from 'i18next';
import avatar from '/icons/avatar.svg';

type ProfileProps = {
  stellarKey: string;
};

const Profile = ({ stellarKey }: ProfileProps) => {
  return (
    <>
      <div className="flex items-center justify-start gap-x-3 bg-hight-dark h-24 w-full mx-auto p-3 rounded-lg lg:w-5/6 text-white mb-10">
        <img src={avatar} alt="avatar-image" />
        <div className="ml-1 inline-block min-w-0">
          <p className="truncate block">{stellarKey}</p>
          <p>{t('certificates.profile.description')}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
