import useUploadPlaylist from "@/hooks/useUploadPlaylist"
import Modal from "../Shared/Modal"
import uniqid from 'uniqid'
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { useState, ChangeEvent } from "react";
import Input from "../SearchBar/Input";
import Button from "../Shared/Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Select from "../Shared/Select";


const UploadPlayListModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadPlaylist();
    const {user} = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            author:'',
            title: '',
            category_id: '',
            song: null,
            image: null,
        }
    });

    const onChange = (open:boolean) =>{
        if(!open){
            reset();
            uploadModal.onClose();
        }
        
    }
    
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
          setIsLoading(true);
          
          const imageFile = values.image?.[0];
          const Title = values.title;
    
          if (!imageFile || !user || !Title) {
            toast.error('Missing fields')
            return;
          }
    
          const uniqueID = uniqid();
          console.log(values);
          // Upload image
          const { 
            data: imageData, 
            error: imageError
          } = await supabaseClient
            .storage
            .from('images')
            .upload(`image-${values.title}-${uniqueID}`, imageFile, {
              cacheControl: '3600',
              upsert: false
            });
    
          if (imageError) {
            setIsLoading(false);
            return toast.error('Failed image upload');
          }
    
          
          // Create record 
          const { error: supabaseError } = await supabaseClient
            .from('playlist')
            .insert({
              user_id: user.id,
              image_path: imageData.path,
              title: values.title
            });
    

          console.log(values);
          
          if (supabaseError) {
            return toast.error(supabaseError.message);
          }
          
          router.refresh();
          setIsLoading(false);
          toast.success('Song created!');
          reset();
          uploadModal.onClose();
        } catch (error) {
          toast.error('Something went wrong');
        } finally {
          setIsLoading(false);
        }
    }
    
  return (
    <Modal
        title="Add PlayList"
        description="Now you can create a playlist"
        isOpen={uploadModal.isOpen}
        onChange={onChange}
    >
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="
                flex flex-col gap-y-4 mb-10
            "
        >
            <Input
                id='title'
                disabled={isLoading}
                {...register('title',{required: true})}
                placeholder='Playlist title'
            />
            <div>
                <div className="pb-1">
                    Select image
                </div>
                <Input
                id='image'
                type="file"
                disabled={isLoading}
                {...register('image',{required: true})}
                accept="image/*"
                />
            </div>
            <Button disabled={isLoading} type="submit">
                Create
            </Button>
        </form>
    </Modal>
  )
}

export default UploadPlayListModal