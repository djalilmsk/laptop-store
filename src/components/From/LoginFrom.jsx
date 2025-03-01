import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, useActionData, useNavigation, redirect } from "react-router-dom";
import { Toggle } from "@radix-ui/react-toggle";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { customFetch } from "../../utils";
import { loginUser } from "@/features/reduxSlices/userSlice";
import { useToast } from "@/hooks/use-toast";

export const action = (store) =>
  async function actionFunction({ request }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData);

    const URL = "/admin/login";
    try {
      const response = await customFetch.post(URL, postData);
      const data = response.data;

      store.dispatch(
        loginUser({
          token: data.token,
          user: data.data,
        }),
      );

      return redirect("/");
    } catch (err) {
      return { status: "error", message: "Invalid email or password" };
    }
  };

export default function LoginForm({ className, ...props }) {
  const { toast } = useToast();
  const actionData = useActionData(); 
  const navigation = useNavigation(); 
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (actionData) {
      const toastText = {
        status: actionData.status,
        description: actionData.message,
        variant: actionData.status === "error" ? "destructive" : "default",
      };

      toast({
        title: `${toastText.status}: ${toastText.description}`,
        variant: toastText.variant,
        duration: 1000,
      });
    }
  }, [actionData, toast]);

  return (
    <Form
      method="post"
      className={cn("flex h-[60dvh] flex-col justify-center gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="mail@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              required
              className="pr-10"
            />
            <Toggle
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </Toggle>
          </div>
        </div>
        <Button
          type="submit"
          disabled={navigation.state === "submitting"} 
          className="w-full"
        >
          {navigation.state === "submitting" ? "Logging in..." : "Login"}
        </Button>
      </div>
    </Form>
  );
}