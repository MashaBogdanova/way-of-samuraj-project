import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "d822d21c-724f-4d0e-af57-432203ec8beb"
    }
});

export const usersAPI = {
    getUsersAPI(currentPageNumber = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPageNumber}&count=${pageSize}`)
            .then(response => response.data); // цепочка промисов, цепочка then // return response --> return data
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(image) {
        const formData = new FormData();
        formData.append("image", image);

        return instance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/from-data"
            }
        }); // отправляем не json файл, нужен content type
    },
    saveProfileData(profile) {
        return instance.put(`profile`, profile);
    }
}

export const authAPI = {
    getAuthData() {
        return instance.get(`auth/me`);
    },
    logIn(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
    logOut() {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get(`security/get-captcha-url`);
    }
}