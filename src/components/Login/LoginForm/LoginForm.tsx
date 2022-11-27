import React, {FC} from "react"
import style from "./LoginForm.module.css"
import {useSelector} from "react-redux"
import {SubmitHandler, useForm} from "react-hook-form"
import {getCaptchaURL} from "../../../redux/selectors/loginSelectors"
import {MyPrimaryButton} from "../../Utils/MyPrimaryButton/MyPrimaryButton"
import {MyInput} from "../../Utils/MyInput/MyInput"
import {MySecondaryButton} from "../../Utils/MySecondaryButton/MySecondaryButton"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux"
import {logInThunk} from "../../../redux/actions/authActions"
import {MyWarningMessage} from "../../Utils/MyWarningMessage/MyWarningMessage";

/* IMPLEMENTED WITH REACT HOOK FORM */

export type Inputs = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export const LoginForm: FC = () => {

    const errorMessage = useAppSelector(state => state.auth.errorMessage)
    const captchaURL = useSelector(getCaptchaURL)
    const dispatch = useAppDispatch()

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({mode: "onBlur"})
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(logInThunk(data.email, data.password, data.rememberMe, data.captcha))
    }

    return <form onSubmit={handleSubmit(onSubmit)} className={style.loginBlock}>

        <div style={{marginBottom: "10px"}}>
            <MyInput
                name="email"
                placeholder="E-mail"
                errors={errors}
                register={register}
                validationSchema={{required: "The field is required"}}
                required
            />
        </div>
        {errors?.email && <MyWarningMessage message={errors.email.message as string}/>}

        <MyInput
            name="password"
            type="password"
            placeholder="Password"
            errors={errors}
            register={register}
            validationSchema={{
                required: "The field is required",
                minLength: {value: 4, message: "The password should consist at least 4 symbols"}
            }}
            required
        />
        {errors?.password && <MyWarningMessage message={errors.password.message as string}/>}
        {errorMessage && <MyWarningMessage message={`${errorMessage}. Please try again`}/>}

        <div className={style.rememberMe}>
            <div> Remember me</div>
            <input {...register("rememberMe")} type="checkbox"/>
        </div>

        <div className={style.buttons}>
            <MyPrimaryButton type="submit">Sign in</MyPrimaryButton>
            <MySecondaryButton type="reset">Reset</MySecondaryButton>
        </div>

        <div className={style.captcha}>
            {captchaURL
                && <div>
                    <img src={captchaURL as string} alt="Captcha symbols"/>
                    <MyInput name="captcha"
                             placeholder="Symbols from the picture"
                             errors={errors}
                             register={register}
                             validationSchema={{required: "The field is required"}}
                             required
                    />
                    <MySecondaryButton type="submit">Send</MySecondaryButton>
                </div>
            }
            {errors?.captcha && <MyWarningMessage message={errors.captcha.message as string}/>}
        </div>

    </form>
}