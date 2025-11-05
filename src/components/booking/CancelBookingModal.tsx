import { Dispatch, SetStateAction } from "react"

type CancelBookingModalProps = {
    handleClick: () => void,
    closeModal: Dispatch<SetStateAction<boolean>>
}


export default function CancelBookingModal({ handleClick, closeModal }: CancelBookingModalProps) {
    return (
        <div className="text-center">
            <p>Are you sure you want to cancel booking?</p>
            <div className="flex gap-2 justify-center">
                <button className="border border-green-500 rounded-md px-2 py-1" onClick={handleClick}>
                    Yes
                </button>
                <button className="border rounded-md px-2 py-1" onClick={() => closeModal(false)}>
                    No
                </button>
            </div>
        </div>
    )
}