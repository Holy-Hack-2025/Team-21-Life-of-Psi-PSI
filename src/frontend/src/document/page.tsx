// Document.tsx
'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

const formSchema = z.object({
  filename: z.string().optional(),
  file: z.any(), // This will be a FileList.
})

type FormDataType = z.infer<typeof formSchema>

const Document = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: { filename: '' },
  })

  // Local state to hold file names stored in localStorage.
  const [filesList, setFilesList] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('uploadedFiles')
    if (stored) {
      setFilesList(JSON.parse(stored))
    }
  }, [])

  const updateLocalStorage = (list: string[]) => {
    localStorage.setItem('uploadedFiles', JSON.stringify(list))
  }

  const onSubmit = async (values: FormDataType) => {
    if (!values.file || !values.file[0]) {
      console.error("No file selected")
      return
    }

    // Use the provided filename or extract from the file object.
    let filename = values.filename || values.file[0].name
    setValue('filename', filename)

    const formData = new FormData()
    formData.append('file_name', filename)
    formData.append('file', values.file[0])

    try {
      // DO NOT manually set the Content-Type header here!
      const response = await axios.post('http://localhost:8000/add_data', formData)
      console.log("Upload response:", response.data)

      const updatedList = [...filesList, filename]
      setFilesList(updatedList)
      updateLocalStorage(updatedList)
      reset()
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  const handleDelete = async (name: string) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/delete_data',
        { file_name: name, file_data: '' },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log("Delete response:", response.data)
      const updated = filesList.filter((f) => f !== name)
      setFilesList(updated)
      updateLocalStorage(updated)
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Document Upload</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <label htmlFor="filename" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Filename
          </label>
          <input
            id="filename"
            type="text"
            placeholder="Enter filename (or leave blank)"
            {...register('filename')}
            style={{ width: '100%', height: '2.5rem', padding: '0.5rem' }}
          />
          {errors.filename && <p style={{ color: 'red' }}>{errors.filename.message}</p>}
        </div>
        <div>
          <label htmlFor="file" style={{ display: 'block', marginBottom: '0.5rem' }}>
            File
          </label>
          <input
            id="file"
            type="file"
            {...register('file')}
            style={{ width: '100%', height: '2.5rem' }}
          />
          {errors.file && <p style={{ color: 'red' }}>Please select a file.</p>}
        </div>
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Upload File
        </button>
      </form>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Uploaded Files</h2>
      {filesList.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filesList.map((fileName) => (
            <li
              key={fileName}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                borderBottom: '1px solid #ccc',
              }}
            >
              <span>{fileName}</span>
              <button
                onClick={() => handleDelete(fileName)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Document;
