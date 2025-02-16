import Image from "next/image";
import styles from "../../styles/Signin.module.css";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const schema = yup.object().shape({
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").required("Le mot de passe est requis"),
  rememberMe: yup.boolean(),
});

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignInFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className={styles.body}>
      <div className={styles.image}>
        <Image className={styles.Image} src="/images/logo.svg" alt="logo" width={0} height={0} priority />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>CONNEXION AU COMPTE</h1>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">

            <div className={styles.inputContainer}>
              <Icon icon="mdi:email-outline" className={styles.icon} />
              <input type="email" placeholder="Email" {...register("email")} />
            </div>
            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
            </div>

            <div className="w-full">
            <div className={styles.inputContainer}>
              <Icon icon="teenyicons:lock-solid" className={styles.icon} />
              <input type="password" placeholder="Mot de passe" {...register("password")} />
            </div>
            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
            <a href="#" className={styles.forgotPassword}>Mot de passe oublié</a>
            </div>
            <div className={styles.checkboxContainer}>
              <input type="checkbox" id="rememberMe" {...register("rememberMe")} />
              <label htmlFor="rememberMe">Garder ma session active</label>
            </div>
            <button className={styles.submitButton} type="submit">CONNEXION</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;