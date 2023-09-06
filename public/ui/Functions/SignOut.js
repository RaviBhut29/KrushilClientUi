import { notification } from "antd";

const SignOut = (client, navigate) => {
    sessionStorage.clear();
    client.cache.reset();
    navigate("/");
    client.clearStore();
    notification.success({
        message: `Logged Out successfully`,
        placement: "top",
    });
}

export default SignOut;