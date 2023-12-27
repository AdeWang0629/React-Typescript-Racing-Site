import { ReactElement, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/Auth/actions";
import { Button } from "semantic-ui-react";
import { RootState } from "../../redux/store";

import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'

import { userImageBaseUrl } from "../../config/constants";

import "./index.css";

const SettingPage: FC = (): ReactElement => {  

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        login_id: "",
        old_password: "",
        new_password: "",
        confirm_new_password: "",
        imageUrl: "",
    });
    
    const [imageEditState, setImageEditState] = useState(false);

    const {userData} = useSelector((state:RootState) => state.authReducer);

    const validationSchema = Yup.object({
        login_id: Yup.string().required('ユーザーIDを入力してください'),
        old_password: Yup.string().min(5, 'パスワードは5文字以上で入力してください')
            .required('以前のパスワードを入力してください'),
        new_password: Yup.string().min(5, 'パスワードは5文字以上で入力してください')
            .required('新しいパスワードを入力してください'),
        confirm_new_password: Yup.string().oneOf([Yup.ref('new_password'), ''], '新しいパスワードが一致しません'),
    });

    const handleCancel = () => {
        navigate(-1);
    };
    
    const runAfterImageDelete = (file:any) => {
        setImageEditState(!imageEditState);
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                initialValues={values}
                validationSchema={validationSchema}
                onSubmit={(value, { setSubmitting }) => {
                    dispatch({
                      type: actions.UPDATE_USERDATA,
                      payload: {data : value, userId: userData.id, navigate}
                    });
                    setSubmitting(false);
                }}
                >
                {({ isSubmitting, setFieldValue  }) => (
                    <Form className="space-y-6">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className="grid grid-cols-3 gap-4">
                                <div></div>
                                {
                                    imageEditState ? (
                                        <div>
                                            <ImageUploader
                                                onFileAdded={(img) => {setFieldValue('imageUrl', img.file)}}
                                                onFileRemoved={(img) => runAfterImageDelete(img)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="container">
                                            <img src={userImageBaseUrl + `${userData.image_url ? userData.image_url : 'DEFAULT.PNG'}`} className="image" style={{width:"100%"}}></img>
                                            <div className="middle">
                                                <div className="text" onClick={()=>setImageEditState(!imageEditState)}>変更</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <label htmlFor="login_id" className="block text-sm font-medium leading-6 text-gray-900">
                            ユーザーID
                            </label>
                            <div className="mt-2">
                            <Field
                                id="login_id"
                                name="login_id"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage name="login_id" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                            <label htmlFor="old_password" className="block text-sm font-medium leading-6 text-gray-900">
                                以前のパスワード
                            </label>
                            </div>
                            <div className="mt-2">
                            <Field
                                id="old_password"
                                name="old_password"
                                type="password"
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage name="old_password" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                            <label htmlFor="new_password" className="block text-sm font-medium leading-6 text-gray-900">
                                新しいパスワード
                            </label>
                            </div>
                            <div className="mt-2">
                            <Field
                                id="new_password"
                                name="new_password"
                                type="password"
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage name="new_password" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                            <label htmlFor="confirm_new_password" className="block text-sm font-medium leading-6 text-gray-900">
                                新しいパスワード（確認）
                            </label>
                            </div>
                            <div className="mt-2">
                            <Field
                                id="confirm_new_password"
                                name="confirm_new_password"
                                type="password"
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage name="confirm_new_password" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <Button className="w-full" primary type="submit">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;録</Button>
                            
                    </Form>
                    
                )}
                </Formik>
                <div className="pt-5">
                    <Button className="w-full" secondary onClick={handleCancel}>キ&nbsp;ャ&nbsp;ン&nbsp;セ&nbsp;ル</Button>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;