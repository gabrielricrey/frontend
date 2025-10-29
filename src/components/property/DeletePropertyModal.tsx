import { Dispatch, SetStateAction } from 'react';
import HostPropertyService from '@/utils/hostPropertyService';
type DeletePropertyModalProps = {
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>,
    id: string,
}

export default function DeletePropertyModal({ setShowDeleteModal, id }: DeletePropertyModalProps) {

    const deleteProperty = async (id: string) => {
        try {
            const response = await new HostPropertyService().deleteProperty(id);

            if (!response.ok) {
                throw new Error("Error deleting property");
            }
            console.log("Success deleting property");
            setShowDeleteModal(prev => !prev);
        } catch (error) {
            console.error("Error:", error);
            setShowDeleteModal(prev => !prev);
        }

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