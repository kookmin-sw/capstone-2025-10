import Button from "../";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log("로그아웃");
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
            로그아웃
    </Button>
  );
};

export default LogoutButton;
