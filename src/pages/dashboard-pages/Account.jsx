import { DataUpdateForm } from "@/components";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";

function Account() {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div>
      <DataUpdateForm user={user} /> {/*account */}{" "}
    </div>
  );
}

export default Account;
