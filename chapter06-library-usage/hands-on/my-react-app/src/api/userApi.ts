import axios from "axios";
import { type RegisterFormInput } from '../components/RegisterForm';

// 送信するデータからconfirmPasswordを除外
export type UserCreationPayload = Omit<RegisterFormInput, 'confirmPassword'>;

export const createUser = async (userData: UserCreationPayload) => {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
    // 実際のAPIでは作成されたユーザー情報が返ってくる
    return data;
};