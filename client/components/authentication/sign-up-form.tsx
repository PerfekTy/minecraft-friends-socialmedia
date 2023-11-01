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
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email must contain something before and after @ sign.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

function SignInForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        values,
      );
      toast.success("Account created successfully!");

      Cookies.set("token", res.data.accessToken);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-1 my-2 text-left">
              <FormLabel className="text-sm text-black">Login</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username..."
                  {...field}
                  className="p-3 h-10 placeholder:text-black border border-craft text-black"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage className="text-error font-semibold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1 my-2 text-left">
              <FormLabel className="text-sm text-black">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name..."
                  {...field}
                  className="p-3 h-10 placeholder:text-black border border-craft text-black"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage className="text-error font-semibold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1 my-2 text-left">
              <FormLabel className="text-sm text-black">E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="E-mail..."
                  {...field}
                  className="p-3 h-10 placeholder:text-black border border-craft text-black"
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
            <FormItem className="space-y-1 my-2 text-left">
              <FormLabel className="text-sm text-black">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password..."
                  {...field}
                  className="p-3 h-10 placeholder:text-black border border-craft text-black"
                  disabled={loading}
                  type="password"
                />
              </FormControl>
              <FormMessage className="text-error font-semibold" />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-1/2 font-semibold text-[15px] mt-5"
            disabled={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SignInForm;
