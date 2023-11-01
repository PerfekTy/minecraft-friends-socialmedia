import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Cookies from "js-cookie";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { ModeToggle } from "../ui/theme-switcher.tsx";
import SignUpModal from "../MODALS/sign-up-modal.tsx";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        values,
      );
      Cookies.set("token", res.data.token);
      toast.success("Successfully logged in!");
      navigate("/");
    } catch (error) {
      // @ts-ignore
        toast.error(error?.response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Login</FormLabel>
              <FormControl>
                <Input
                  placeholder="Login..."
                  {...field}
                  className="p-3 h-10"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage className="text-error font-semibold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password..."
                  {...field}
                  type="password"
                  className="p-3 h-10"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage className="text-error font-semibold" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full font-semibold text-[15px]"
          disabled={loading}
        >
          Submit
        </Button>
      </form>
      <div className="flex items-center justify-between my-5">
        <SignUpModal />
        <ModeToggle />
      </div>
    </Form>
  );
}

export default SignIn;
