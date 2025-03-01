import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dot, Mail, Phone } from "lucide-react";

import { formatNumber } from "libphonenumber-js";
import { Form } from "react-router-dom";
import {
  InputAddress,
  InputFullName,
  InputNote,
  InputPhoneNumber,
  SelectionShipping,
  SelectionWilaya,
} from "@/components/customerData/Inputs";

const Contact = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm sm:max-w-3xl">
        <Card className={"flex flex-col gap-6 p-4"}>
          <div className="relative flex justify-between max-sm:flex-col">
            <span className="flex flex-col items-center px-4 sm:w-1/2 sm:justify-center">
              <Label className="text-nowrap pb-3 text-4xl font-semibold sm:py-4">
                Get in Touch
              </Label>
              <Label className="ms:p-0 w-4/5 pb-6 text-justify text-muted-foreground">
                Need assistance? Fill out the form below, or contact us via
                phone or email. We’ll respond to your message as quickly as
                possible.
              </Label>
            </span>
            <Card className="overflow-hidden sm:w-1/2">
              <CardHeader className="flex flex-col gap-5">
                <CardTitle className="flex items-center gap-3 font-medium">
                  <Button variant="outline" className="h-12 w-12">
                    <Phone className="size-10" />
                  </Button>
                  <span>
                    {formatNumber("+213999999999", "INTERNATIONAL")}
                    <CardDescription className="flex font-normal">
                      Reach us directly via phone
                    </CardDescription>
                  </span>
                </CardTitle>
                <CardTitle className="flex items-center gap-3">
                  <Button variant="outline" className="h-12 w-12">
                    <Mail className="size-10" />
                  </Button>
                  <span>
                    m@example.com
                    <CardDescription className="font-normal">
                      Mail us, we’ll reply back shortly
                    </CardDescription>
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Card className="overflow-hidden p-4">
            <CardContent className="p-0">
              <div className="flex flex-col gap-10 py-3">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">We’re Here to Help</h1>
                    <p className="text-balance text-muted-foreground">
                      Feel free to reach out anytime.
                    </p>
                  </div>
                </div>
                <Form
                  method="POST"
                  className="flex flex-col gap-3 lg:col-span-2"
                >
                  <InputFullName />
                  <InputPhoneNumber />
                  <SelectionWilaya />
                  <InputAddress />
                  <InputNote required={true} />

                  <Button type="submit">Send Message</Button>
                </Form>
              </div>
            </CardContent>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
