import { useEffect, useState } from 'react';
import { Button, Modal, Select, Input, Typography } from 'antd';
import { hour_data, minute_data, month_data, race_number_data } from '../../config/global';
import { Label } from 'semantic-ui-react';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';

import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/RaceManagement/actions';
import dayjs from 'dayjs';

const { Text } = Typography;

interface IRegisterModal {
    _open: boolean;
    showModal: any;
    editData: any;
}

const RegisterModal : React.FC<IRegisterModal> = ({_open, showModal, editData}) => {

    const [open, setOpen] =  useState(_open);
    
    const { places } = useSelector((state: RootState) => state.raceReducer);
    const [placesData, setPlacesData] = useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        const updateData = places.map((obj:any) => {
            return {
                value: obj.id,
                label: obj.name
            };
        });
        setPlacesData(updateData);
    },[places]);

    useEffect(()=>{
        setOpen(_open);
    },[_open]);

    useEffect(()=>{
        if (Object.entries(editData).length) {
            setEventDate(editData.event_date);
            setEventPlace(editData.event_place);
            setRaceNumber(editData.race_number);
            setHourData(editData.hour_data);
            setMinuteData(editData.minute_data);
            setRaceName(editData.race_name);
            setMonthData(editData.month_data);

            const newHorseData =[...horseValues];
            editData.running_horses.map((item:any, index:any)=> {
                newHorseData[index] = item.name.split(":")[1];
                return item;
            });

            setHorseValues(newHorseData);
        }else{
            setEventDate('');
            setEventPlace('');
            setRaceNumber('');
            setHourData('13');
            setMinuteData('00');
            setRaceName('');
            setMonthData('1');
        }
    },[editData]);

    const [eventDate, setEventDate] = useState<string>('');
    const [eventDateError, setEventError] = useState<boolean>(false);
    const onEventDataChange: DatePickerProps['onChange'] = (date, dateString) => {
        setEventDate(dateString);
    };

    const handleCancel = () => {
        setOpen(!open);
        showModal();
    };

    const [eventPlace, setEventPlace] = useState<string>('');
    const [eventPlaceError, setEventPlaceError] = useState<boolean>(false);
    const handleEventPlace = (value: string) => {
        setEventPlace(value);
    };

    const [raceNumber, setRaceNumber] = useState<string>('');
    const [raceNumberError, setRaceNumberError] = useState<boolean>(false);
    const handleRaceNumberChange = (value: string) => {
        setRaceNumber(value);
    };

    const [hourData, setHourData] = useState<string>('13');
    const [hourDataError, setHourDataError] = useState<boolean>(false);
    const handleHourDataChange = (value: string) => {
        setHourData(value);
    };

    const [minuteData, setMinuteData] = useState<string>('00');
    const [minuteDataError, setMinuteDataError] = useState<boolean>(false);
    const handleMinuteDataChange = (value: string) => {
        setMinuteData(value);
    };

    const [raceName, setRaceName] = useState<string>('');
    const [raceNameError, setRaceNameError] = useState<boolean>(false);
    const handleRaceNameChange = (e : any) => {
        setRaceName(e.target.value);
    };

    const [monthData, setMonthData] = useState<string>('1');
    const [monthDataError, setMonthDataError] = useState<boolean>(false);
    const handleMonthDataChange = (value: string) => {
        setMonthData(value);
    };

    const [horseValues, setHorseValues] = useState(Array(20).fill(''));
    const handleInputChange = (index : number, value : string) => {
        const updatedHorseValues = [...horseValues];
        updatedHorseValues[index] = value;
        setHorseValues(updatedHorseValues);
    };
    const [horseValueErrors, setHorseValueErrors] = useState(Array(20).fill(false));

    const handleOk = () => {
        if (eventDate.length) {
            setEventError(false);
        }
        if (eventPlace) {
            setEventPlaceError(false);
        }
        if (raceNumber.length) {
            setRaceNumberError(false);
        }
        if (hourData.length) {
            setHourDataError(false);
        }
        if (minuteData.length) {
            setMinuteDataError(false);
        }
        if (raceName.length) {
            setRaceNameError(false);
        }
        if (monthData.length) {
            setMonthDataError(false);
        }

        if (!eventDate.length) {
            setEventError(true);
        }else if (!eventPlace) {
            setEventPlaceError(true);
        }else if (!raceNumber.length) {
            setRaceNumberError(true);
        }else if (!hourData.length) {
            setHourDataError(true);
        }else if (!minuteData.length) {
            setMinuteDataError(true);
        }else if (!raceName.length) {
            setRaceNameError(true);
        }else if (!monthData.length) {
            setMonthDataError(true);
        }else {
            const filteredArray = horseValues.filter((element) => element !== "");

            if (Object.entries(editData).length) {
                const data = {
                    event_date: eventDate,
                    event_place: eventPlace,
                    race_number: raceNumber,
                    hour_data: hourData,
                    minute_data: minuteData,
                    race_name: raceName,
                    month_data: monthData,
                    horse_data: filteredArray
                }
        
                dispatch({
                    type: actions.UPDATERACESTORE,
                    payload: {
                        data: data,
                        id: editData.id
                    }
                });
            }else{
                const data = {
                    event_date: eventDate,
                    event_place: eventPlace,
                    race_number: raceNumber,
                    hour_data: hourData,
                    minute_data: minuteData,
                    race_name: raceName,
                    month_data: monthData,
                    horse_data: filteredArray
                }
        
                dispatch({
                    type: actions.NEWRACESTORE,
                    payload: data
                });
            }
    
            setOpen(!open);
            showModal();
        }
    };

    return (

        <Modal
            open={open}
            style={{ top: 20 }}
            title="新 規 登 録"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn, }) => (
                <div className='pr-6'>
                    <Button className="w-full" onClick={handleOk}>保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
                </div>
            )}
            width={400}
        >

            <div className='flex items-center'>

                <Label color='red' horizontal className='w-24'>
                    開　催　日
                </Label>

                {
                    eventDate.length ? 
                    <DatePicker className='w-full lg:w-64' onChange={onEventDataChange} id="event_date" name="event_date" value={dayjs(eventDate)} /> : 
                    <DatePicker className='w-full lg:w-64' onChange={onEventDataChange} id="event_date" name="event_date" />
                }
                
            </div>

            { eventDateError && (<Text type="danger" className='p-20'>日付を入力してください。</Text>) }

            <div className='flex items-center pt-5'>
                
                <Label color='red' horizontal className='w-24'>
                    開催場所
                </Label>
                <Select
                    value={eventPlace ? placesData[Number(eventPlace) - 1] : "開催場所を選択してください。"}
                    className='w-full lg:w-64'
                    onChange={handleEventPlace}
                    options={placesData}
                />

            </div>
            
            { eventPlaceError && (<Text type="danger" className='p-20'>開催地を選択してください。</Text>) }

            <div className='flex items-center pt-5'>
                
                <Label color='red' horizontal className='w-24'>
                    レース番号
                </Label>
                <Select
                    value={raceNumber ? raceNumber : "レース番号を選択してください。"}
                    className='w-full lg:w-64'
                    onChange={handleRaceNumberChange}
                    options={race_number_data}
                />

            </div>
            
            { raceNumberError && (<Text type="danger" className='p-20'>レース番号を選択してください。</Text>) }
            
            <div className='flex items-center pt-5'>
                
                <Label color='red' horizontal className='w-24'>
                    発走時刻
                </Label>
                <Select
                    value={hourData ? hourData : hourData}
                    className='w-full lg:w-28 mr-2'
                    onChange={handleHourDataChange}
                    options={hour_data}
                />
                
                <Label color='teal' className='w-4'>
                    :
                </Label>

                <Select
                    value={minuteData ? minuteData : minuteData}
                    className='w-full lg:w-28 ml-2'
                    onChange={handleMinuteDataChange}
                    options={minute_data}
                />  
            </div>

            { (hourDataError || minuteDataError) && (<Text type="danger" className='p-20'>発走時刻を選択してください。</Text>) }

            <div className='flex items-center pt-5'>
                
                <Label color='red' horizontal className='w-24'>
                    レース名
                </Label>
                <Input placeholder="レース名" className='w-full lg:w-64' onChange={handleRaceNameChange} value={raceName}/>

            </div>

            { raceNameError && (<Text type="danger" className='p-20'>レース名を選択してください。</Text>) }

            <div className='flex items-center pt-5'>
                
                <Label color='red' horizontal className='w-24'>
                    集計月
                </Label>
                <Select
                    value={monthData ? monthData : monthData}
                    className='w-full lg:w-64'
                    onChange={handleMonthDataChange}
                    options={month_data}
                />

            </div>
            
            { monthDataError && (<Text type="danger" className='p-20'>集計月を選択してください。</Text>) }

            <div className='flex items-center pt-5'>
                
                <Label color='red' horizontal className='w-24'>
                    出走馬
                </Label>

            </div>

            {horseValues.slice(0, 10).map((value, index) => (
                <div key={index}>
                    <div className='flex items-center pt-5'>
                        <Label basic color='red' pointing='right'>
                            {index + 1}番
                        </Label>
                        <Input
                            placeholder={`${index + 1}番馬`}
                            className='w-full lg:w-28'
                            style={{ marginRight: 18 }}
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                        <Label basic color='red' pointing='right'>
                            {index + 11}番
                        </Label>
                        <Input
                            placeholder={`${index + 11}番馬`}
                            className='w-full lg:w-28'
                            value={horseValues[index + 10]}
                            onChange={(e) => handleInputChange(index + 10, e.target.value)}
                        />
                    </div>
                    <div className='flex items-center pt-5'>
                        {horseValueErrors[index] && (
                            <Text type="danger">
                                これを入力してください。
                            </Text>
                        )}
                        {horseValueErrors[index + 10] && (
                            <Text type="danger">
                                これを入力してください。
                            </Text>
                        )}
                    </div>
                </div>
            ))}

        </Modal>             
    )
}

export default RegisterModal;