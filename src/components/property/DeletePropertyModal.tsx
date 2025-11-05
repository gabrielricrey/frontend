import { Dispatch, SetStateAction } from 'react';
import HostPropertyService from '@/utils/hostPropertyService';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

type DeletePropertyModalProps = {
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>,
    id: string,
}

export default function DeletePropertyModal({ setShowDeleteModal, id }: DeletePropertyModalProps) {
    const router = useRouter();

    const deleteProperty = async (id: string) => {

        const response = await new HostPropertyService().deleteProperty(id);

        if (!response.ok) {
            setShowDeleteModal(prev => !prev);
            throw new Error("Error deleting property");
        }
        console.log("Success deleting property");
        toast.success("Success deleting property");
        setShowDeleteModal(prev => !prev);
        router.push('/host/property');

    }

    const cancelDeleteProperty = () => {

        setShowDeleteModal(prev => !prev);
    }

    return (
        <div className='absolute w-full h-screen z-10 flex justify-center items-center bg-black opacity-55'>

            <div className="w-full sm:w-3/4 md:1/2 rounded-md z-20 bg-white flex flex-col items-center ">
                <p>Are you sure you want to delete?</p>
                <div className='flex flex-col'>
                    <button onClick={() => deleteProperty(id)}>
                        Delete
                    </button>
                    <button onClick={cancelDeleteProperty}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )

}