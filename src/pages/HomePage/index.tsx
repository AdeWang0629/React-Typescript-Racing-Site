import * as React from 'react'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import brandImgPath from '../../assets/596630.jpg';

import { Label, Segment, Message } from 'semantic-ui-react'

import TableWithLabel from '../../components/TableWithLabel';

const HomePage = () => {
    return (
        <div>

            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                autoplay={{delay: 3000}}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper : any) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >

                <SwiperSlide>
                    <img src={brandImgPath} />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={brandImgPath} />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={brandImgPath} />
                </SwiperSlide>
                
                <SwiperSlide>
                    <img src={brandImgPath} />
                </SwiperSlide>

            </Swiper>

            <div className="flex flex-col md:flex-row pt-6">
                
                <div className='w-full lg:w-1/2 md:pr-8 pb-5'>

                    <Label as='a' color='red' tag>
                        ランキング TOP3
                    </Label>
                
                    <Segment raised style={{backgroundColor: "#f5deb3"}}>

                        <div className='pb-3'>
                            <Label as='a' color='orange' ribbon>
                                予選バトル ポイント獲得数TOP3
                            </Label>
                        </div>


                        <TableWithLabel content={"1月度ランキング"}/>
                        <TableWithLabel content={"上半期ランキング"}/>
                        <TableWithLabel content={"年間ランキング"}/>

                        <div className='pb-3'>
                            <Label as='a' color='olive' ribbon>
                                予選バトル ポイント獲得数TOP3
                            </Label>
                        </div>

                        <TableWithLabel content={"1月度ランキング"}/>
                        <TableWithLabel content={"上半期ランキング"}/>
                        <TableWithLabel content={"年間ランキング"}/>

                        <div className='pb-3'>
                            <Label as='a' color='violet' ribbon>
                                予選バトル ポイント獲得数TOP3
                            </Label>
                        </div>
                        
                        <TableWithLabel content={"1月度ランキング"}/>
                        <TableWithLabel content={"上半期ランキング"}/>
                        <TableWithLabel content={"年間ランキング"}/>

                        <div className='pb-3'>
                            <Label as='a' color='pink' ribbon>
                                予選バトル ポイント獲得数TOP3
                            </Label>
                        </div>

                        <TableWithLabel content={"1月度ランキング"}/>
                        <TableWithLabel content={"上半期ランキング"}/>
                        <TableWithLabel content={"年間ランキング"}/>

                    </Segment>

                </div>

                <div className='w-full lg:w-1/2 md:pl-8'>

                    <Label as='a' color='red' tag>
                        BOCからのお知らせ
                    </Label>

                    <Segment raised style={{backgroundColor: "#f5deb3"}}>

                        <Message
                            info
                            header='2022.01.05 予想バトル【新ルール】導入！'
                        />
                        
                        <p>
                            2020/6/26にシステムを更新しました。
                            恐れ入りますが、後ほどメールにて新しいアカウント情報をお送りしますので、 再度ログインをお願いします。
                            その際、shpgrp.comからのドメイン解除をお願いします。
                            メールは送信専用アカウントから送信されますので、迷惑フォルダに入っている 可能性もありますので、来ていないと思われた方は迷惑フォルダを確認してみてください。
                            お手数をお掛けしますが、よろしくお願いします。
                        </p>
                        
                        <Message
                            info
                            header='2021.01.22 新システム【ロト３】導入！'
                        />
                        
                        <p>
                            2020/6/26にシステムを更新しました。
                            恐れ入りますが、後ほどメールにて新しいアカウント情報をお送りしますので、 再度ログインをお願いします。
                            その際、shpgrp.comからのドメイン解除をお願いします。
                            メールは送信専用アカウントから送信されますので、迷惑フォルダに入っている 可能性もありますので、来ていないと思われた方は迷惑フォルダを確認してみてください。
                            お手数をお掛けしますが、よろしくお願いします。
                        </p>

                        <Message
                            info
                            header='2020.06.26 システムバージョンUPのお知らせ'
                        />
                        
                        <p>
                            2020/6/26にシステムを更新しました。
                            恐れ入りますが、後ほどメールにて新しいアカウント情報をお送りしますので、 再度ログインをお願いします。
                            その際、shpgrp.comからのドメイン解除をお願いします。
                            メールは送信専用アカウントから送信されますので、迷惑フォルダに入っている 可能性もありますので、来ていないと思われた方は迷惑フォルダを確認してみてください。
                            お手数をお掛けしますが、よろしくお願いします。
                        </p>

                        <Message
                            info
                            header='2020.06.26 システムバージョンUPのお知らせ'
                        />
                        
                        <p>
                            2020/6/26にシステムを更新しました。
                            恐れ入りますが、後ほどメールにて新しいアカウント情報をお送りしますので、 再度ログインをお願いします。
                            その際、shpgrp.comからのドメイン解除をお願いします。
                            メールは送信専用アカウントから送信されますので、迷惑フォルダに入っている 可能性もありますので、来ていないと思われた方は迷惑フォルダを確認してみてください。
                            お手数をお掛けしますが、よろしくお願いします。
                        </p>

                    </Segment>

                </div>

            </div>

        </div>

    )
}

export default HomePage;