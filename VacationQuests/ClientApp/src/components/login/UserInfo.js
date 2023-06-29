import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UploadAvatar from './UploadAvatar'

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const [icon, setIcon] = useState("");
    const [bio, setBio] = useState("");

    const navigate = useNavigate();

    const createUser = () => {
        console.log("Creating New User")
        navigate('/')
    }

    return (
        <>
            <div className="d-flex justify-content-center text-center mt-5 card p-5 w-50">
                <div className="form-group">
                    <h1 className="mt-4">Additional Information </h1>

                    <UploadAvatar className="align-items-center" />
                    <div class="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingBio" placeholder="Bio" onKeyUp={(e) => setBio(e.target.value)} />
                        <label for="floatingBio">Bio</label>
                    </div>
                </div>
                <div className="flex-row">
                    <button className="btn btn-secondary w-25 m-3" onClick={createUser}>Skip</button>
                    <button className="btn btn-primary w-25 m-3" onClick={createUser}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default UserInfo; 