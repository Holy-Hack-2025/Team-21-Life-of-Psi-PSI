// Document.tsx
'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

// Define our form schema.
// Here we expect a filename and a file input. (The file input value will be a FileList)
const formSchema = z.object({
  filename: z.string().min(5, "Filename must be at least 5 characters").max(50),
  file: z.any(), // For a file, you can further validate if needed.
})

type FormDataType = z.infer<typeof formSchema>

const Document = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filename: '',
    },
  })

  const onSubmit = async (values: FormDataType) => {
    // Create FormData to send file as multipart/form-data.
    const formData = new FormData()
    formData.append('file_name', values.filename)
    // Using register('file') directly on the input, its value will be a FileList.
    if (values.file && values.file[0]) {
      formData.append('file', values.file[0])
    } else {
      console.error("No file selected")
      return
    }

    try {
      const response = await axios.post('http://localhost:8000/add_data', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log("Upload response:", response.data)
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Document Upload</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="filename">Filename</label>
          <input
            id="filename"
            type="text"
            placeholder="Enter filename"
            {...register('filename')}
            style={{ width: '100%', height: '2.5rem', padding: '0.5rem' }}
          />
          {errors.filename && <p style={{ color: 'red' }}>{errors.filename.message}</p>}
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            id="file"
            type="file"
            {...register('file')}
            style={{ width: '100%', height: '2.5rem' }}
          />
          {errors.file && <p style={{ color: 'red' }}>Please select a file.</p>}
        </div>
        <button type="submit" style={{ padding: '0.75rem', fontSize: '1rem' }}>
          Upload file
        </button>
      </form>
    </div>
  )
}

export default Document
