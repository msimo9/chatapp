import React, {useState} from 'react'

const BirthDatePicker = ({setDay, setMonth, setYear}) => {


    const days = [];
    const months = [];
    const years = [];

    for(let i=1; i<=31; i++){
        days.push(i);
    }
    for(let i=1; i<=12; i++){
        months.push(i);
    }
    for(let i=1900; i<=2022; i++){
        years.push(i);
        if(i === 2022) years.reverse();
    }

  return (
        <div className='w-4/5 flex justify-center items-center py-4'>
            <select defaultValue={31} onChange={(e) => setDay(e.target.value >= 10 ? e.target.value : "0"+e.target.value)} name="days" className='bg-secondary text-primary rounded-2xl justify-center items-center mx-2 flex w-1/4 font-bold hover:w-1/3 transition-all duration-300 h-10 pl-2 hover:rounded-md'>
                {
                    days.map((item) => {
                        return(
                            <option classname='w-full flex justify-center items-center' value={item}>{item}</option>
                        )
                    })
                }
            </select>
            <select defaultValue={12} onChange={(e) => setMonth(e.target.value >= 10 ? e.target.value : "0"+e.target.value)} name="months" className='bg-secondary text-primary rounded-2xl justify-center items-center mx-2 flex w-1/4 font-bold hover:w-1/3 transition-all duration-300 h-10 pl-2 hover:rounded-md'>
                {
                    months.map((item) => {
                        return(
                            <option value={item}>{item}</option>
                        )
                    })
                }
            </select>
            <select defaultValue={2022} onChange={(e) => setYear(e.target.value)} name="years" className='bg-secondary text-primary rounded-2xl justify-center items-center mx-2 flex w-1/4 font-bold hover:w-1/3 transition-all duration-300 h-10 pl-2 hover:rounded-md'>
                {
                    years.map((item) => {
                        return(
                            <option value={item}>{item}</option>
                        )
                    })
                }
            </select>
        </div>
  )
}

export default BirthDatePicker