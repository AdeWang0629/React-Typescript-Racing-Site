import React, { ReactElement, FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import brandImgPath from '../../assets/brand.png';
import { useDispatch } from "react-redux";
import actions from "../../redux/Auth/actions";

const SignIn: FC = (): ReactElement => {  

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

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={brandImgPath}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          アカウントにログインする
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={(value, { setSubmitting }) => {
            dispatch({
              type: actions.LOGIN,
              payload: {data : value, navigate}
            });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
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

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  ログイン
                </button>
              </div>
            </Form>
          )}
        </Formik>


        <p className="mt-10 text-center text-sm text-gray-500">
          アカウントをお持ちではない方{' '}
          <Link to={"/signup"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              無 料 登 録
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;