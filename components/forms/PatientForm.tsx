"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import {useRouter} from "next/navigation"
import { createUser} from "@/lib/actions/patient.actions"

export enum FormFieldType{
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox', 
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}
 
const PatientForm= () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); 
  
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name:"",
      email:"",
      phone: "",

    },
  })
 
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    
    try {
      const userData = { name, email, phone };
      console.log("Sending user data:", userData); // ✅ Debugging
  
      const user = await createUser(userData);
      console.log("User created:", user); // ✅ Debugging
  
      if (user) {
        router.push(`/patients/${user.$id}/register`);
      } else {
        console.log("User creation failed, user is null or undefined");
      }
    } catch (error) {
      console.log("Error in form submission:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
            <h1 className="header"> Hi there👋</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
            
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name = "name"
            label = "Full name"
            placeholder = "John Doe"
            iconSrc = "/assets/icons/user.svg"
            iconAlt = "user"
        />

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name = "email"
            label = "Email"
            placeholder = "example@gmail.com"
            iconSrc = "/assets/icons/email.svg"
            iconAlt = "email"
        />

          <CustomFormField 
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name = "phone"
            label = "Phone number"
            placeholder = "12456-7899"
            iconSrc = "/assets/icons/email.svg"
            iconAlt = ""
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
    ) 
 }

export default PatientForm