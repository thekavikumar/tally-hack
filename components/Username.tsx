"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const adjectives = ["happy", "clever", "cool", "lucky", "silly", "brave"];
const nouns = ["cat", "dog", "panda", "tiger", "lion", "unicorn"];

function generateRandomUsername() {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}-${randomNoun}`;
}

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  difficulties: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

export function Username() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  function handleRegenerate() {
    form.setValue("username", generateRandomUsername());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={field.value}
                  />
                  <Button type="button" onClick={handleRegenerate}>
                    Generate
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Type your username or generate a random one.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulties"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Difficulty Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a difficulty level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
