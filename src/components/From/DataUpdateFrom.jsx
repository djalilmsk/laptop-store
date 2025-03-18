import { Button } from "@/components/ui/button";
import {
  InputEmail,
  InputFullName,
  InputPassword,
} from "@/components/customerData/Inputs";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { Separator } from "../ui/separator";
import { ImageUpdate } from "@/components";
import { Section } from "../ui/section";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { customFetch } from "@/utils";
import { dataUpdate } from "@/features/reduxSlices/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const requestData = Object.fromEntries(formData);
    const token = store.getState().userReducer.token;

    const image = {
      lastModified: 1741129038237,
      path: "",
      name: "",
      size: 0,
      type: "application/octet-stream",
      webkitRelativePath: "",
    };

    const name = `${requestData.firstName} ${requestData.lastName}`;

    // add URL object
    // const url = new URL();
    const submissionData = new FormData();
    submissionData.append("fullName", name);
    submissionData.append("email", requestData.email);
    if (requestData.image.size !== 0) {
      submissionData.append("image", requestData.image);
    }
    console.log(submissionData.get("image"));

    // submissionData.append("password", requestData.newPassword || "");
    // submissionData.append("comfirmPassword", requestData.confirmPassword || "");

    const url = "/admin/";
    try {
      const response = await customFetch.patch(url, submissionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log(data.data);
      store.dispatch(
        dataUpdate({
          user: data.data.user,
        }),
      );
      return { status: "success", message: "The data has been changed" };
    } catch (err) {
      console.log(err);
      return {
        status: "error",
        message: err?.response?.data?.message || "Failed to change the data",
      };
    }
  };

const initialData = {
  fullName: "username",
  image: "",
  email: "user.email@example.com",
};

function DataUpdateForm({ user = initialData }) {
  const { toast } = useToast();
  const actionData = useActionData();
  const navigation = useNavigation();

  const [INITIAL_FIRST_NAME = "", INITIAL_LAST_NAME = ""] =
    user?.fullName?.split(" ") || ["", ""];
  const INITIAL_EMAIL = user?.email || "";
  const INITIAL_IMAGE = user?.image || "";

  const [firstName, setFirstName] = useState(INITIAL_FIRST_NAME);
  const [lastName, setLastName] = useState(INITIAL_LAST_NAME);
  const [email, setEmail] = useState(INITIAL_EMAIL);
  const [image, setImage] = useState(INITIAL_IMAGE);

  useEffect(() => {
    if (actionData) {
      toast({
        title: `${actionData.status}: ${actionData.message}`,
        variant: actionData.status === "success" ? "default" : "destructive",
        duration: 1000,
      });

      if (actionData.status === "success") {
        setFirstName(INITIAL_FIRST_NAME);
        setLastName(INITIAL_LAST_NAME);
        setEmail(INITIAL_EMAIL);
        setImage(INITIAL_IMAGE);
      }
    }
  }, [
    actionData,
    toast,
    INITIAL_FIRST_NAME,
    INITIAL_LAST_NAME,
    INITIAL_EMAIL,
    INITIAL_IMAGE,
  ]);

  return (
    <Form method="PATCH" encType="multipart/form-data">
      <Section
        title="Account"
        description="Your account information and activities"
      />
      <Separator />
      <ImageUpdate
        user={{
          fullName: `${firstName} ${lastName}`.trim(),
          email: email,
          image: image,
        }}
        setImage={setImage}
      />
      <Separator />
      <Section>
        <InputFullName
          setFirstState={setFirstName}
          setLastState={setLastName}
          defaultValue={{
            firstName: INITIAL_FIRST_NAME,
            lastName: INITIAL_LAST_NAME,
          }}
        />
      </Section>
      <Separator />
      <Section>
        <InputEmail setState={setEmail} defaultValue={INITIAL_EMAIL} />
      </Section>
      <Separator />
      {/* Comment out or remove password fields if not supported by the API */}
      {/* <Section>
        <div className="flex justify-between gap-3">
          <InputPassword 
            className="w-full" 
            name="newPassword"
            placeholder="New Password"
          />
          <InputPassword 
            className="w-full" 
            confirmPassword={true} 
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
      </Section>
      <Separator /> */}
      <Section>
        <Button
          type="submit"
          disabled={navigation.state === "submitting"}
          className="w-full"
        >
          {navigation.state === "submitting" ? "Changing..." : "Submit Changes"}
        </Button>
      </Section>
    </Form>
  );
}

export default DataUpdateForm;
