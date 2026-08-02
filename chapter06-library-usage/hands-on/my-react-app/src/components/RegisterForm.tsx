import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { createUser } from "../api/userApi";

const RegisterSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // エラーメッセージをconfirmPasswordフィールドに関連付ける
  });

// Zodスキーマから型を推論
export type RegisterFormInput = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
  // React Hook Formの設定
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // isSubmittingを追加
    reset, // フォームをリセットする関数
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(RegisterSchema),
  });

  // TanStack QueryのuseMutationの設定
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("User created successfully:", data);
      alert("User registration successful!");
      reset(); // 成功したらフォームリセット
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Failed to create user:", error);
      alert(`Error: ${message}`);
    },
  });

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    mutation.mutate(payload);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="register-form__header">
        <p className="register-form__eyebrow">Create an account</p>
        <h2>User Registration</h2>
        <p>Enter your details to get started.</p>
      </div>

      <div className="form-field">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          autoComplete="username"
          aria-invalid={Boolean(errors.username)}
          {...register("username")}
        />
        {errors.username && (
          <p className="form-error" role="alert">{errors.username.message}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && <p className="form-error" role="alert">{errors.email.message}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />
        {errors.password && (
          <p className="form-error" role="alert">{errors.password.message}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.confirmPassword)}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="form-error" role="alert">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* サーバーからのエラーを表示 */}
      {mutation.isError && (
        <p className="form-error form-error--server" role="alert">
          {mutation.error.message}
        </p>
      )}

      <button type="submit" disabled={isSubmitting || mutation.isPending}>
        {isSubmitting || mutation.isPending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

// TanStack Queryを使うなら、基本的にはこれだけでも十分
// <button type="submit" disabled={mutation.isPending}>
//      {mutation.isPending ? "Registering..." : "Register"}
// </button>
