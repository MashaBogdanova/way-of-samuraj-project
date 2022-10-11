import React, {FC} from "react"
import style from "./NewPostForm.module.css"
import {actions} from "../../../redux/profileReducer"
import {useDispatch} from "react-redux"
import {SubmitHandler, useForm} from "react-hook-form"

type Inputs = {
    newPost: string,
}

export const NewPostForm: FC = () => {

    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<Inputs>({mode: "onBlur"})
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(actions.addPost(data.newPost))
        reset()
    }

    return <form onSubmit={handleSubmit(onSubmit)} className={style.newPost}>

        <input {...register("newPost", {
            maxLength: {value: 300, message: "The length of message must be 300 characters or fewer."}
        })}
               className={style.newMessage}
               placeholder={"Write something..."}
        />
        <button type="submit" disabled={!isValid} className={style.button}>Send</button>

        {errors.newPost
        && <div className={style.warning}>
            {errors?.newPost?.message || "Error"}
        </div>
        }

    </form>
    }
