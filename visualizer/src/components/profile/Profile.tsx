import PropTypes, { InferProps } from 'prop-types';
import { t } from 'i18next';
import avatar from '/icons/avatar.svg';
import './styles.css';

const propTypes = {
  stellarKey: PropTypes.string.isRequired
};
const Profile = ({ stellarKey }: InferProps<typeof propTypes>) => {
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

Profile.propTypes = propTypes;

export default Profile;
