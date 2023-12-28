import * as React from 'react'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import brandImgPathFirst from '../../assets/1.png';
import brandImgPathSecond from '../../assets/2.jpg';
import brandImgPathThird from '../../assets/3.jpg';

import { Label, Segment, Message } from 'semantic-ui-react'

import TableWithLabelFirst from '../../components/TableWithLabelFirst';
import TableWithLabelScond from '../../components/TableWithLabelScond';
import TableWithLabelThird from '../../components/TableWithLabelThird';
import TableWithLabelForth from '../../components/TableWithLabelForth';

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
                // onSwiper={(swiper : any) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
                className='lg:h-[60rem] md:h-[40rem] sm:h-[30rem] h-[20rem] w-full'
            >

                <SwiperSlide>
                    <img src={brandImgPathFirst} style={{ height: "100%", width: "100%" }} />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={brandImgPathSecond} style={{ height: "100%", width: "100%"}} />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={brandImgPathThird} style={{ height: "100%", width: "100%" }} />
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


                        <TableWithLabelFirst content={"1月ランキング"}/>
                        <TableWithLabelFirst content={"上半期ランキング"}/>
                        <TableWithLabelFirst content={"年間ランキング"}/>

                        <div className='pb-3'>
                            <Label as='a' color='blue' ribbon>
                                予選バトル ◎的中率TOP3
                            </Label>
                        </div>

                        <TableWithLabelScond content={"1月ランキング"}/>
                        <TableWithLabelScond content={"上半期ランキング"}/>
                        <TableWithLabelScond content={"年間ランキング"}/>

                        <div className='pb-3'>
                            <Label as='a' color='violet' ribbon>
                                予選バトル 単勝回収率TOP3
                            </Label>
                        </div>
                        
                        <TableWithLabelThird content={"1月ランキング"}/>
                        <TableWithLabelThird content={"上半期ランキング"}/>
                        <TableWithLabelThird content={"年間ランキング"}/>

                        <div className='pb-3'>
                            <Label as='a' color='pink' ribbon>
                                予選バトル 複勝回収率TOP3
                            </Label>
                        </div>

                        <TableWithLabelForth content={"1月ランキング"}/>
                        <TableWithLabelForth content={"上半期ランキング"}/>
                        <TableWithLabelForth content={"年間ランキング"}/>

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
                        
                        <p style={{fontSize: '1.2em'}}>
                            ■「単勝」ボーナス <br></br>
                            　・◎が１着以内に来た場合：200Pt <br></br> <br></br>

                            ■「複勝」ボーナスの追加 <br></br>
                            　・◎が３着以内に来た場合：100Pt <br></br> <br></br>

                            ■「馬連」ボーナスの変更・追加 <br></br>
                            　・◎－〇が順不同で２着以内に来た場合：200Pt <br></br>
                            　・◎－▲が順不同で２着以内に来た場合：150Pt <br></br>
                            　・◎－☆が順不同で２着以内に来た場合：100Pt <br></br>
                            　・◎－穴が順不同で２着以内に来た場合： 50Pt <br></br> <br></br>

                            ■「３連複」ボーナスの変更・追加 <br></br>
                            　・◎－〇－▲の３頭が順不同で３着以内に来た場合：500Pt <br></br>
                            　・◎－〇－☆の３頭が順不同で３着以内に来た場合：450Pt <br></br>
                            　・◎－〇－穴の３頭が順不同で３着以内に来た場合：400Pt <br></br>
                            　・◎－▲－☆の３頭が順不同で３着以内に来た場合：350Pt <br></br>
                            　・◎－▲－穴の３頭が順不同で３着以内に来た場合：300Pt <br></br>
                            　・◎－☆－穴の３頭が順不同で３着以内に来た場合：250Pt <br></br>
                            　・〇－▲－☆の３頭が順不同で３着以内に来た場合：200Pt <br></br>
                            　・〇－▲－穴の３頭が順不同で３着以内に来た場合：150Pt <br></br>
                            　・〇－☆－穴の３頭が順不同で３着以内に来た場合：100Pt <br></br>
                            　・▲－☆－穴の３頭が順不同で３着以内に来た場合： 50Pt <br></br> <br></br>

                            ■「消」ポイントの変更 <br></br>
                            　・１番人気を消して、４着以降の場合：50Pt <br></br>
                            　・２番人気を消して、４着以降の場合：40Pt <br></br>
                            　・３番人気を消して、４着以降の場合：30Pt <br></br>
                            　・４番人気を消して、４着以降の場合：20Pt <br></br>
                            　・５番人気を消して、４着以降の場合：10Pt <br></br> <br></br>
 
                            ■「穴」馬の重複は禁止 <br></br>
                            　・(旧)ルールでは、「穴」馬のみ重複が可能でしたが、(新)ルールでは不可とします。 <br></br>
                        </p>
                        
                    </Segment>

                </div>

            </div>

        </div>

    )
}

export default HomePage;