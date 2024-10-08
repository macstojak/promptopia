'use client';
import { FormEvent, FormEventHandler, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";


const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({prompt: "", tag: ""});
    const {data: session} = useSession();
    const router = useRouter();

    const createPrompt = async (event: FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/api/prompt/new', {
                method:"POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user?.name ?? "",
                    tag: post.tag
                })
            })
            console.log(response, session)
            if(response.ok) { 
                router.push("/")
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt;