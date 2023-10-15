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
import { ModeToggle } from "../ui/theme-switcher.tsx";
import SignUp from "../MODALS/Sign-up.tsx";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                <Input placeholder="Login..." {...field} className="p-3 h-10" />
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
                  className="p-3 h-10"
                />
              </FormControl>
              <FormMessage className="text-error font-semibold" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-semibold text-[15px]">
          Submit
        </Button>
        <div className="flex items-center justify-between">
          <SignUp />
          <ModeToggle />
        </div>
      </form>
    </Form>
  );
}

export default SignIn;
