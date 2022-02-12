import React, { useState, useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import Card from '@/components/common/Card';
import SVGIcon from '@/components/common/svg-icon/SVGIcon';

function DatePicker(props){
    let [open, setOpen] = useState(false);

    let wrapper = useRef("wrapper")

    useClickOutside(wrapper, () => {setOpen(false);});
      
    let daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getDayDetails = args => {
        let date = args.index - args.firstDay; 
        let day = args.index%7;
        let prevMonth = args.month-1;
        let prevYear = args.year;
        if(prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
        let _date = (date < 0 ? prevMonthNumberOfDays+date : date % args.numberOfDays) + 1;
        let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
        let timestamp = new Date(args.year, args.month + month, _date).getTime();
        return {
            date: _date,
            day,
            month, 
            timestamp,
            dayString: daysMap[day]
        }
    }

    const getNumberOfDays =(year, month) => {
        return 40 - new Date(year, month, 40).getDate();
    }

    const getMonthDetails =(year, month) => {
        let firstDay = (new Date(year, month)).getDay();
        let numberOfDays = getNumberOfDays(year, month);
        let monthArray = [];
        let rows = 6;
        let currentDay = null;
        let index = 0; 
        let cols = 7;

        for(let row=0; row<rows; row++) {
            for(let col=0; col<cols; col++) { 
                currentDay = getDayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year,
                    month
                });
                monthArray.push(currentDay);
                index++;
            }
        }
        return monthArray;
    }
   
    let date =props.date || new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    
    let [state, setState] = useState({
        year,
        month,
        timestamp: date.getTime(),
        monthDetails: getMonthDetails(year, month)
    })

    const isSelectedDay = day => {
        return day.timestamp === state.timestamp && day.month === 0;
    }

    const onDateClick = day => {
        if(day.month !== 0) return;
        setState({...state, timestamp: day.timestamp});
        if(props.onChange) {
            props.onChange(day.timestamp);
        }
        setOpen(false);
    }

    //function to Navigate months & year
  
    const getMonthStr = month => monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

    const getDateStringFromTimestamp = timestamp => {
        let dateObject = new Date(timestamp);
        let month = dateObject.getMonth()+1;
        let date = dateObject.getDate();
        return (date < 10 ? '0'+date : date) + '-' + (month < 10 ? '0'+month : month) + '-' + dateObject.getFullYear() ;
    }

    const changeYear = offset => {
        let year = state.year + offset;
        let month = state.month;
        setState({ 
            ...state,
            year,
            monthDetails: getMonthDetails(year, month)
        })
    }

    const changeMonth = offset => {
        let year = state.year;
        let month = state.month + offset;
        if(month === -1) {
            month = 11;
            year--;
        } else if(month === 12) {
            month = 0;
            year++;
        }
        setState({ 
            ...state,
            year, 
            month,
            monthDetails: getMonthDetails(year, month)
        })
    }

    return (
        <div className='relative' ref={wrapper}>
            <div onClick={() => setOpen(!open)} className={`flex items-center justify-between cursor-pointer border rounded font-medium border-primary-300 p-2 ${open && "border-primary-600"} ${props.error && "border-danger"}`}>
                {
                    props.date != null
                    ? <p className='text-sm text-primary-900'>{getDateStringFromTimestamp(props.date.getTime())}</p>
                    : <p className='text-sm text-primary-600'>{props.hintText}</p>
                }
                
                <SVGIcon className='w-6 h-6' icon={'calender'} /> 
            </div>
            {open && <Card className='absolute overflow-hidden top-full right-0 p-4' style={{width:'300px'}}>
                <div className='flex justify-between mb-4 items-center'>
                    <SVGIcon onClick={() => changeMonth(-1)} className='w-6 h-6' icon={'angle-left'} /> 
                        <h1>{getMonthStr(state.month)} {state.year}</h1>
                    <SVGIcon onClick={() => changeMonth(1)} className='w-6 h-6' icon={'angle-right'} /> 
                </div>
                <div>
                    <div className='grid grid-cols-7 mb-2'>
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d,i)=><div key={i} className='text-xs font-bold text-primary-900 text-center'>{d}</div>)}
                    </div>  
                    <div className='grid grid-cols-7'>
                        {
                            state.monthDetails.map((day, index)=> {
                                return (
                                    <div 
                                    onClick={() => onDateClick(day)} 
                                    key={index} 
                                    className={`rounded text-center text-sm mb-1 py-1 
                                    ${day.month !== 0 ? 'text-primary-400 cursor-default' : 'cursor-pointer hover:bg-primary-300 '} 
                                    ${isSelectedDay(day) ? 'text-primary-100 bg-primary-900 hover:bg-primary-900' : ''}`}>
                                        {day.date}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Card>}
        </div>
    );
}

export default DatePicker;