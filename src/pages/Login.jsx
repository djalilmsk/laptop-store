import { LoginForm } from "@/components";
import { GalleryVerticalEnd } from "lucide-react"

export default function LoginPage() {
  return (
    (<div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>)
  );
}
