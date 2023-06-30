import { useEffect, useState } from 'react'
import Avatar from 'react-avatar-edit'

const UploadAvatar = ({ icon }) => {
    const [src, setSrc] = useState(null)
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        icon(preview)
    }, [preview])

    const onClose = () => {
        setPreview(null);
    }

    const onCrop = view => {
        setPreview(view)
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">

            <div className='mb-3'>
                <Avatar
                    width={400}
                    height={300}
                    onClose={onClose}
                    onCrop={onCrop}
                    src={src}
                />
            </div>
            {preview && <img  className='my-4' src={ preview } /> }
        </div>
        )
}

export default UploadAvatar