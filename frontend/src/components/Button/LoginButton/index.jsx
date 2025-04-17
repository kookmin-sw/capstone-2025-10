import Button from "../";

const LoginButton = ({ onLogin }) => {
  const handleLogout = () => {
    if (onLogin) {
      onLogin();
    } else {
      console.log("로그인");
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      로그인
    </Button>
  );
};

export default LoginButton;
