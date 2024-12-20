import { useNavigate } from 'react-router-dom';

const ForgotPasswordLink = () => {
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    navigate('/m-admin/forgot-password');
  };

  return (
    <div className="text-right">
      <p className="text-gray-600 mb-2">Forgot your password?</p>
      <p className="text-gray-600">
        No worries! You can reset it &nbsp;
        <button
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={handleForgotPasswordClick}
        >
          here
        </button>
        .
      </p>
    </div>
  );
};

export default ForgotPasswordLink;
