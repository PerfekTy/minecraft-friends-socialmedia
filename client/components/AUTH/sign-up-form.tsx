import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters and must contain @ sign.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                  className="p-3 h-10 text-black"
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
                  className="p-3 h-10 text-black"
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
                  className="p-3 h-10 text-black"
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
                  className="p-3 h-10 text-black"
                />
              </FormControl>
              <FormMessage className="text-error font-semibold" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-semibold text-[15px] mt-5">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
