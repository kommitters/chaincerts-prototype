import avatar from '/icons/avatar.svg';
import PropTypes, { InferProps } from 'prop-types';
import { t } from 'i18next';
import './styles.css';

const propTypes = {
  stellar_key: PropTypes.string.isRequired
};
const Profile = ({ stellar_key }: InferProps<typeof propTypes>) => {
  return (
    <div className="profile">
      <img className="avatar" src={avatar} alt="avatar-image" />
      <div>
        <p>{stellar_key}</p>
        <p>{t('certificates.profile.description')}</p>
      </div>
    </div>
  );
};

Profile.propTypes = propTypes;

export default Profile;
