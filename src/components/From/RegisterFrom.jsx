import { Form, useActionData, useNavigation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  InputEmail,
  InputFullName,
  InputPassword,
} from "../customerData/Inputs";
import { Section } from "../ui/section";
import { Separator } from "../ui/separator";
import { ImageUpdate } from "..";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { customFetch } from "@/utils";

export const action = () =>
  async function actionFunction({ request }) {
    const formData = await request.formData();
    const requestData = Object.fromEntries(formData);

    const postData = {
      email: requestData.email,
      password: requestData.newPassword,
      comfirmPassword: requestData.confirmPassword,
      fullName: `${requestData.firstName} ${requestData.lastName}`,
      image: "https://github.com/shadcn.png",
    };

    const URL = "/admin/signup";
    try {
      const response = await customFetch.post(URL, postData);
      const data = response.data.status;

      return { status: "success", message: "User has been created" };
    } catch (err) {
      return { status: "error", message: "Failed to create a user" };
    }
  };

function RegisterFrom() {
  const { toast } = useToast();
  const actionData = useActionData();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("New");
  const [lastName, setLastName] = useState("User");
  const [email, setEmail] = useState("new.user@example.com");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (actionData) {
      const toastText = {
        status: actionData.status,
        description: actionData.message,
        variant: actionData.status === "success" ? "default" : "destructive",
      };

      toast({
        title: `${toastText.status}: ${toastText.description}`,
        variant: toastText.variant,
        duration: 1000,
      });
    }
  }, [actionData, toast]);

  return (
    <Form method="POST" className="">
      <Section
        title={"Create New Account"}
        description="Create new admin account "
      />
      <Separator />
      <ImageUpdate
        user={{
          fullName: `${firstName} ${lastName}`,
          email: email,
          image: image,
        }}
      />
      <Separator />
      <Section>
        <InputFullName
          setFirstState={setFirstName}
          setLastState={setLastName}
          firstDefault="New"
          lastDefault="User"
        />
      </Section>
      <Separator />
      <Section>
        <InputEmail setState={setEmail} stateDefault="new.user@example.com" />
      </Section>
      <Separator />
      <Section>
        <div className="flex justify-between gap-3">
          <InputPassword className="w-full" newPassword={true} />
          <InputPassword className="w-full" confirmPassword={true} />
        </div>
      </Section>
      <Separator />
      <Section>
        <Button
          type="submit"
          disabled={navigation.state === "submitting"}
          className="w-full"
        >
          {navigation.state === "submitting" ? "Creating..." : "Create Account"}
        </Button>
      </Section>
    </Form>
  );
}

export default RegisterFrom;
