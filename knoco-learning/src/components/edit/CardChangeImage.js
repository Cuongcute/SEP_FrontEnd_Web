import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import myImage from '../../assets/profile.jpg';
import './CardEditClass.css'

const CardChangeImage = ({ closePopup }) => {
    const UserID = 2;
    const [userDt, setUserDt] = useState({});
    const [imageSource, setImage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        fetchData();
        fetchImage();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetUserProfile/${UserID}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setUserDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const fetchImage = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetUserImage/GetImage/${UserID}`);
            if (response.ok) {
                const imageData = await response.blob();
                setImage(URL.createObjectURL(imageData));
            }
        } catch (error) {
            console.error('Lỗi khi lấy ảnh:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {

        // const userUpdate = {
        //     userId: userDt.userId,
        //     image: imageSource,
        // };

        e.preventDefault();

        if (!selectedImage) {
            console.error('Vui lòng chọn ảnh');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await fetch(`https://localhost:7169/api/User/UploadImage/UploadImage/${UserID}`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                console.log('Hình ảnh đã được tải lên thành công');
                closePopup();
                window.location.reload();
            } else {
                console.error('Lỗi khi tải lên hình ảnh:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Lỗi khi tải lên hình ảnh:', error);
        }
    };

    return (
        <div className="card-edit-class">
            <form onSubmit={handleSubmit}>
                <h2>Change Image</h2>

                <img src={imageSource || myImage} alt={imageSource || "Profile"} />
                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />

                <button type="submit" id="submit" name="submit" className="btn-btn">Change</button>
                <button type="button" onClick={closePopup} className="btn-btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardChangeImage;