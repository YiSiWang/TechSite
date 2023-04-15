import { useState, memo } from 'react';
import styles from './Chat.module.css';

export const useChat = () => {
};

const SentMessage = memo(({ msg }) => {
  return (
    <div className={styles.sent}>{msg}</div>
  );
});

const ReceivedMessage = memo(({ msg }) => {
  return (
    <div className={styles.received}>{msg}</div>
  );
});

export const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const send = () => {
    setMessages(pre => [...pre, inputText]);
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.output}>
        {messages.map((msg, index) => {
          if (index % 2) {
            return <ReceivedMessage msg={msg}/>;
          } else {
            return <SentMessage msg={msg}/>;
          }
        })}
      </div>
      <div className={styles.bottom}>
        <textarea className={styles.input} value={inputText} onChange={handleInputChange}/>
        <button className={styles.button} onClick={send}>发送</button>
      </div>
    </div>
  );
};