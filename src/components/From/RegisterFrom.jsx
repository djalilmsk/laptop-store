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

// Action remains unchanged
export const action = (store) =>
  async function actionFunction({ request }) {
    const formData = await request.formData();
    const requestData = Object.fromEntries(formData);
    const token = store.getState().userReducer.token;

    const postData = {
      email: requestData.email,
      password: requestData.newPassword,
      comfirmPassword: requestData.confirmPassword,
      fullName: `${requestData.firstName} ${requestData.lastName}`,
      image: requestData.image,
    };

    const URL = "/admin/signup";
    try {
      const response = await customFetch.post(URL, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { status: "success", message: "User has been created" };
    } catch (err) {
      return { status: "error", message: "Failed to create a user" };
    }
  };

function RegisterForm() { // Fixed typo in component name from RegisterFrom to RegisterForm
  const { toast } = useToast();
  const actionData = useActionData();
  const navigation = useNavigation();
  
  // Initial values as constants for easy reset
  const INITIAL_FIRST_NAME = "New";
  const INITIAL_LAST_NAME = "User";
  const INITIAL_EMAIL = "new.user@example.com";
  const INITIAL_IMAGE = "";

  const [firstName, setFirstName] = useState(INITIAL_FIRST_NAME);
  const [lastName, setLastName] = useState(INITIAL_LAST_NAME);
  const [email, setEmail] = useState(INITIAL_EMAIL);
  const [image, setImage] = useState(INITIAL_IMAGE);

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

      // Reset form on success
      if (actionData.status === "success") {
        setFirstName(INITIAL_FIRST_NAME);
        setLastName(INITIAL_LAST_NAME);
        setEmail(INITIAL_EMAIL);
        setImage(INITIAL_IMAGE);
      }
    }
  }, [actionData, toast]);

  return (
    <Form method="POST" className="">
      <Section
        title={"Create New Account"}
        description="Create new admin account"
      />
      <Separator />
      <ImageUpdate
        user={{
          fullName: `${firstName} ${lastName}`,
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
          firstDefault={INITIAL_FIRST_NAME}  // Changed to use current state
          lastDefault={INITIAL_LAST_NAME}    // Changed to use current state
        />
      </Section>
      <Separator />
      <Section>
        <InputEmail 
          setState={setEmail} 
          stateDefault={INITIAL_EMAIL}      // Changed to use current state
        />
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

export default RegisterForm;