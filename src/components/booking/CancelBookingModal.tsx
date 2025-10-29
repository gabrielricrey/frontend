type CancelBookingModalProps = {
    handleClick: () => void
}


export default function CancelBookingModal({ handleClick }: CancelBookingModalProps) {
    return (
        <div className="">
            <p>Are you sure you want to delete?</p>
            <div>
                <button onClick={handleClick}>
                    Delete
                </button>
                <button>
                    Cancel
                </button>
            </div>
        </div>
    )
}