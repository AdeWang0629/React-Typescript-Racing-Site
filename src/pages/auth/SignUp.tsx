import React, { ReactElement, FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import actions from "../../redux/Auth/actions";
import { useDispatch } from 'react-redux';
import brandImgPath from '../../assets/brand.png';

const SignUp: FC = (): ReactElement => {  

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    // user_name: "",
    user_email: "",
    password: "",
    login_id: "",
  });

  const validationSchema = Yup.object({
    // user_name: Yup.string()
    //   .required('お名前を入力してください'),
    login_id: Yup.string()
      .required('識別子を入力してください'),
    user_email: Yup.string()
      .email('メールアドレスの形式が正しくありません')
      .required('メールアドレスを入力してください'),
    password: Yup.string()
      .min(5, 'パスワードは8文字以上で入力してください')
      .required('パスワードを入力してください'),
  });

  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={brandImgPath}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            アカウントを登録する
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              dispatch({
                type: actions.REGISTER,
                payload: {data, navigate}
              })
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {/* <div>
                  <label htmlFor="user_name" className="block text-sm font-medium leading-6 text-gray-900">
                    お名前
                  </label>
                  <div className="mt-2">
                    <Field
                      id="user_name"
                      name="user_name"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="user_name" component="div" className="text-red-500" />
                  </div>
                </div> */}

                <div>
                  <label htmlFor="login_id" className="block text-sm font-medium leading-6 text-gray-900">
                    アカウント名
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
                  <label htmlFor="user_email" className="block text-sm font-medium leading-6 text-gray-900">
                    メール アドレス
                  </label>
                  <div className="mt-2">
                    <Field
                      id="user_email"
                      name="user_email"
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="user_email" component="div" className="text-red-500" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      パスワード
                    </label>
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

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    新 規 登 録
                  </button>
                </div>
              </Form>
            )}
          </Formik>


          <p className="mt-10 text-center text-sm text-gray-500">
            アカウントをお持ちの方{' '}
            <Link to={"/signin"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              ロ グ イ ン
            </Link>
          </p>
        </div>
    </div>
  );
};

export default SignUp;