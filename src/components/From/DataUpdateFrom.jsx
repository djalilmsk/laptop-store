import { Button } from "@/components/ui/button";

import {
  InputEmail,
  InputFullName,
  InputPassword,
} from "@/components/customerData/Inputs";

import { Form } from "react-router-dom";
import { Separator } from "../ui/separator";
import { ImageUpdate } from "@/components";
import { Section } from "../ui/section";

const initialData = {
  fullName: "username",
  image: null,
  email: "user.email@example.com",
};

function DataUpdateForm({ user = initialData }) {
  const [firstName = "", lastName = ""] = user?.fullName.split(" ");

  return (
    <Form method="post" className="">
      <Section
        title="Account"
        description="Your account information and activities"
      />

      <Separator />
      <ImageUpdate user={user} />

      <Separator />
      <Section>
        <InputFullName defaultValue={{ firstName, lastName }} />
      </Section>

      <Separator />
      <Section>
        <InputEmail defaultValue={user?.email} />
      </Section>

      <Separator />
      <Section>
        <div className="flex w-full gap-3">
          <InputPassword className="w-1/2" />
          <InputPassword className="w-1/2" newPassword />
        </div>
      </Section>

      <Separator />
      <Button className="mt-5 w-full" type="submit">
        Submit Changes
      </Button>
    </Form>
  );
}

export default DataUpdateForm;
