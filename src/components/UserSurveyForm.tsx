'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form";
import { formSchema, FormSchemaType } from "@/types/form/formZod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";

export default function UserSurveyForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 1,
      phoneNumber: '',
      occupation: '',
      hobby: '',
      preferredContactMethod: undefined,
      feedback: ''
    }
  })

  const {mutate: sendFormResponse, isPending} = useMutation({
    mutationFn: async (values: FormSchemaType) => {
      return await axios.post('/api/v1/form', values)
    },
    onSuccess: (data) => {
      toast({
        title: 'Success',
        description: 'Form data submitted successfully.'
      })
      return
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          toast({
            title: 'Error',
            description: 'Invalid request data passed',
            variant: 'destructive'
          })
          return
        } else if (error.response?.status === 429) {
          toast({
            title: 'Error',
            description: 'Rate limited',
            variant: 'destructive'
          })
          return
        } else if (error.response?.status === 401) {
          toast({
            title: 'Error',
            description: 'User with this email already exists',
            variant: 'destructive'
          })
          return
        }
      }
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      })
      return
    }
  })

  return (
    <main className="container max-w-xl my-8">
      <h1 className="text-2xl">Redes - Seguridad - Forma</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((e) => sendFormResponse(e))} className="space-y-6 max-w-xl mx-auto">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jordan@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="Age" {...field} type="number" onChange={(e) => {
                    if (!isNaN(Number(e.target.valueAsNumber))) {
                      field.onChange(e.target.valueAsNumber)
                    }
                  }} min={1} max={99}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="612..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hobby"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hobby</FormLabel>
                <FormControl>
                  <Input placeholder="Playing videogames" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredContactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Contact Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EMAIL">Email</SelectItem>
                    <SelectItem value="PHONE">Phone</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feedback</FormLabel>
                <FormControl>
                  <Textarea placeholder="Feedback..." {...field} rows={4}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full flex items-center justify-center gap-2">
            {isPending && <Loader2 className={`h-4 w-4 animate-spin`}/>}
            Submit
          </Button>
        </form>
      </Form>
    </main>
  )
}
