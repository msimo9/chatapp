import React from 'react'

const RenderMessageBlock = ({item}) => {
    if(item.sender === true){
        return(
            <div className='w-full flex justify-end'>
                <div className='bg-primary w-2/5 h-auto p-4 text-secondary my-2 rounded-2xl flex justify-end'>
                    {item.message}
                </div>
            </div>
        )
    }else{
        return(
            <div className='w-full flex justify-start'>
                <div className='bg-secondary w-2/5 h-auto p-4 text-primary my-2 rounded-2xl'>
                    {item.message}
                </div>
            </div>
        )
    }
}

const RenderMessages = ({messages}) => {
    const reverseM = messages.reverse();
    return (
    <div className='w-full h-full flex flex-col px-4 py-8 justify-end'>
        {
            reverseM.map((item, index) => {return(<RenderMessageBlock key={index} item={item} />)})
        }
    </div>
  )
}

export default RenderMessages