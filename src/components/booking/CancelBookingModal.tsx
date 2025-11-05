import { Dispatch, SetStateAction } from "react"

type CancelBookingModalProps = {
    handleClick: () => void,
    closeModal: Dispatch<SetStateAction<boolean>>
}


export default function CancelBookingModal({ handleClick, closeModal }: CancelBookingModalProps) {
    return (
        <div className="">
            <p>Are you sure you want to cancel booking?</p>
            <div>
                <button onClick={handleClick}>
                    Yes
                </button>
                <button onClick={() => closeModal(false)}>
                    No
                </button>
            </div>
        </div>
    )
}