import PropTypes from 'prop-types';

// projeto import
import AuthCard from './AuthCard';


// ==============================|| AUTENTICAÇÃO - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
    return (<AuthCard>{children}</AuthCard>);
}

AuthWrapper.propTypes = { children: PropTypes.node };