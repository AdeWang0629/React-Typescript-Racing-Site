import { FC, ReactNode, Fragment, useEffect, useState } from "react";

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import brandImgPath from '../assets/brand.png';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigate, useLocation } from "react-router-dom";
import actions from "../redux/Auth/actions";

import { Divider } from 'semantic-ui-react'

type MainLayoutProps = {
  children: ReactNode;
  mainNavigationData: any;
  currentPageName: string;
}


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
}

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [
  { name: 'マイページ', href: '/mypage' },
  { name: 'ユーザー情報の変更', href: '/user-information' },
]

const MainLayout: FC<MainLayoutProps> = ({ children, mainNavigationData, currentPageName }) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [mainNavigation, setMainNavigation] = useState<NavigationItem[]>(mainNavigationData);

  useEffect(()=>{
    const oldMainNavigation = mainNavigation.map((item:any) => {
      item.current = false;
      return item;
    });

    const newMainNavigation = oldMainNavigation.map((item:any) => {
      if (item.href == location.pathname) {
        item.current = true;
      }

      return item;
    })

    setMainNavigation(newMainNavigation);

  },[location.pathname]);

  return (
    <div className="min-h-full">

      <Disclosure as="nav" style={{backgroundColor: '#00ff7f'}}>
        {({ open }) => (
          <>
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src={brandImgPath}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {mainNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-green-900'
                              : 'text-black-300 hover:bg-green-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium text-black'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                          style={item.current ? {color: 'white'} : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full p-1 text-black-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 cursor'
                                )}
                                onClick={() => dispatch({type:actions.LOGOUT})}
                              >
                                サインアウト
                              </span>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-green-800 p-2 text-gray-400 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-green-900 text-white' : 'text-black-300 hover:bg-green-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium text-black'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    style={item.current ? {color: 'white'} : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{user.name}</div>
                    <div className="text-sm font-medium leading-none text-black-400">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full p-1 text-black-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-black-400 hover:bg-green-700 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <span
                    className="block rounded-md px-3 py-2 text-base font-medium text-black-400 hover:bg-green-700 hover:text-white"
                    onClick={() => dispatch({type:actions.LOGOUT})}
                  >
                    サインアウト
                  </span>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header>
      
        <div className="mx-auto max-w-screen-2xl px-4 pt-2 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{currentPageName}</h1>
        </div>

      </header>

      <Divider />

      <main>

        <div className="mx-auto max-w-screen-2xl pt-2 sm:px-6 lg:px-8">

          {children}

        </div>

      </main>

      <Divider />

      <div className="text-center">
        <span>
          Copyright© BOCコミュニティ All Rights Reserved.
        </span>
      </div>

    </div>
  )
};

export default MainLayout;
