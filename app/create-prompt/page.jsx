'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/form'


const Page = () => {

  const router = useRouter();
  const {data:session} = useSession();


  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  const createPrompt = async (e) =>{
    e.preventDefault();
    setSubmitting(true);

    try{
      const response = await fetch('/api/prompt/new',{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: session?.user.id,
          prompt: post.prompt,
          tag:post.tag
        })
      })

      if(response.ok){
        router.push("/")
      }
    }catch(error){
      console.log("FROM CREATE-PROMPT",error)
    }finally{
      setSubmitting(false)
    }
  }

  return (
    <Form
      type = "Create"
      post = {post}
      setPost = {setPost}
      submitting = {submitting}
      handleSubmit = {createPrompt}
    />

  )
}

export default Page