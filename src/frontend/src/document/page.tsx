'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {useForm} from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Upload } from 'lucide-react'
import axios from 'axios'
const formSchema = z.object({
  filename: z.string().min(5).max(50),
  file: z.any(),
})

const Document = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filename: '',
    },
  })

  const fileRef = form.register('file')

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // TO FIX: code 422
    axios.post(
      'http://localhost:8000/add_data',
      {
        filename: values.filename,
        file: values.file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  }

  return (
    <>
      <h1 className='ml-10 mt-10 mb-5 text-3xl font-semibold'>
        Document Upload
      </h1>
      <p className='ml-10'>Upload your documents to get a real time analysis</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full p-10'>
          <FormField
            control={form.control}
            name='filename'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className='text-gray-500 font-normal mb-2'>
                    FILENAME
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='w-4xl h-[60px]'
                      placeholder='Enter filename'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        <FormField
          control={form.control}
          name="file"
          render={({ field: _field }) => {
            return (
              <FormItem>
                <FormLabel className="text-gray-500 font-normal mt-5 mb-2">
                  FILE
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-4xl h-[60px]"
                    type="file"
                    {...fileRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

          <Button className='mt-5 w-4xl h-[60px]' type='submit'>
            <Upload />
            <span className='ml-3'>Upload file</span>
          </Button>
        </form>
      </Form>
    </>
  )
}

export default Document
