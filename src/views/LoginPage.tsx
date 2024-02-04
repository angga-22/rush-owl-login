import Form from "@/components/templates/login/Form";
import SideContent from "@/components/templates/login/SideContent";

const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center ">
      <SideContent />
      <Form />
    </div>
  );
};

export default LoginPage;
