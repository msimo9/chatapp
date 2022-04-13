import React, { useState } from 'react'
import { FaPaperPlane, FaSmile} from "react-icons/fa";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import RenderMessages from './RenderMessages';
import messages from '../sampleMessages';

const MainContent = () => {
    return(
        <div className='w-full h-[90%]'>
            <RenderMessages messages={messages} />
        </div>
    )
}

const Footer = () => {
    const [text, setText] = useState("");
    const [emojiField, setEmojiField] = useState(false);
    const handleAddingEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setText(text + emoji);
    }

    const handleSendMessage = () => {
        console.log("your sent message would be: ", text);
        setText("");
    }

    return(
        <div className='w-full h-16 bg-primary flex justify-center items-center'>
            
            <input onFocus={() => setEmojiField(false)} value={text} onChange={(e) => setText(e.target.value)} className='bg-secondary w-4/5 h-3/5 shadow-2xl drop-shadow-2xl rounded-3xl hover:rounded-md transition-all duration-300 border-2 border-secondary pl-12 pr-6' type={"text"} placeholder={"enter your message here..."} />
            <div className='w-12 h-12 z-60 relative flex justify-center items-center mx-4 hover:bg-secondary rounded-3xl transition-all duration-300 group hover:cursor-pointer'>
                <FaSmile onClick={() => setEmojiField(!emojiField)} className='text-primary w-6 h-6 transition-all duration-300 absolute -left-16 border-2 border-secondary'/>
                {
                    emojiField &&
                    <div className='absolute -top-[900%] -left-44 w-48 h-48'>
                        <Picker
                            className='w-48'
                            perLine={7}
                            theme={"dark"}
                            enableFrequentEmojiSort={false}
                            emojiSize={16}
                            showPreview={false}
                            color={"#FFD662FF"}
                            onSelect={emoji => handleAddingEmoji(emoji)}
                            style={{backgroundColor: "#00539CFF", borderColor: "#FFD662FF", borderWidth: 3, borderRadius: 12,}}
                            />
                    </div>
                }
                <FaPaperPlane onClick={ () => {setEmojiField(false); handleSendMessage()}} className='text-secondary w-6 h-6 group-hover:text-primary transition-all duration-300'/>
            </div>
        </div>
    )
}


const Messages = () => {
  return (
    <div className='w-auto h-full justify-end ml-80 flex flex-col'>
        <MainContent />
        <Footer />
    </div>
  )
}

export default Messages