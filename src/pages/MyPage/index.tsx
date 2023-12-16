import React, { ReactElement, FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import brandImgPath from '../../assets/brand.png';
import { useDispatch } from "react-redux";
import actions from "../../redux/Auth/actions";
import { Button } from "semantic-ui-react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Col, Row } from 'antd';
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const Index: FC = (): ReactElement => {  

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        login_id: "",
        password: ""
    });

    const validationSchema = Yup.object({
        login_id: Yup.string()
        .required('ユーザーIDを入力してください'),
        password: Yup.string()
        .min(5, 'パスワードは8文字以上で入力してください')
        .required('パスワードを入力してください'),
    });

    const handleCancel = () => {
        console.log("123123123123123123123");
    };
    
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                initialValues={values}
                validationSchema={validationSchema}
                onSubmit={(value, { setSubmitting }) => {
                    // dispatch({
                    //   type: actions.LOGIN,
                    //   payload: {data : value, navigate}
                    // });
                    setSubmitting(false);
                    console.log("1111111111111111111111111111111111111111");
                }}
                >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className="grid grid-cols-3 gap-4">
                                <div></div>
                                <div>
                                    <Upload
                                        name="avatar"
                                        listType="picture-circle"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </div>
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
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                パスワード
                            </label>
                            <div className="text-sm">
                                {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                パスワードをお忘れですか?
                                </a> */}
                            </div>
                            </div>
                            <div className="mt-2">
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500" />
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

export default Index;