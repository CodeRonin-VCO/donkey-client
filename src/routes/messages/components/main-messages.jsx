import { useAtom } from "jotai";
import styles from "./main-messages.module.css";
import { tokenAtom, userAtom } from "../../../stores/auth.stores.js";
import { useEffect, useState } from "react";
import { createSocket } from "../../../sockets/socket.js";
import ConnectionsComponents from "../../../components/connections/connections.jsx";
import { messagesCacheAtom } from "../../../stores/msg.stores.js";
import logoDonkey from "./../../../assets/logo-donkey-profile.png";
import { useTranslation } from "react-i18next";


export default function MainMessagesPage() {
    // trad
    const { t } = useTranslation();

    const [token] = useAtom(tokenAtom);
    const [user] = useAtom(userAtom);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [input, setInput] = useState("")
    const [messagesCache, setMessagesCache] = useAtom(messagesCacheAtom);

    // Quand on sélectionne un ami, on pourra charger l'historique via API
    useEffect(() => {
        if (!selectedFriend) {
            return;
        }

        if (messagesCache[selectedFriend._id]) {
            setMessages(messagesCache[selectedFriend._id]);
            return;
        }

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/messages?friendId=${selectedFriend._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                console.log("fetch data res.json front", data);

                const msgs = data.messages || [];

                setMessages(msgs);
                setMessagesCache(prev => ({ ...prev, [selectedFriend._id]: msgs }));

            } catch (err) {
                console.error("Failed to load messages", err);
            }
        };

        fetchMessages();
    }, [selectedFriend, token]);

    // Connection socket io (listening)
    useEffect(() => {
        if (!token) return;

        const socketInstance = createSocket(token);
        setSocket(socketInstance);

        socketInstance.connect();

        socketInstance.on("connect", () => {
            console.log("Connected with socket id :", socketInstance.id);
            // Inscrire userId auprès du serveur
            socketInstance.emit("register_user", user._id);
        });

        socketInstance.on("receive_message", (message) => {
            if (selectedFriend && (message.sender === selectedFriend._id || message.receiver === selectedFriend._id)) {
                setMessages((prev) => {
                    const updated = [...prev, message];
                    setMessagesCache(prevCache => ({
                        ...prevCache,
                        [selectedFriend._id]: updated
                    }));
                    return updated;
                });
            }
        });

        return () => {
            socketInstance.disconnect();
            setSocket(null);
        };
    }, [token, user?._id, selectedFriend]);

    // Envoi du message via socket
    const sendMessage = () => {
        if (!input || !selectedFriend) return;

        const msg = {
            sender: user._id,
            receiver: selectedFriend._id,
            content: input.trim(),
        };

        if (!socket) return;
        socket.emit("send_message", msg);

        // Ajout local immédiat
        setMessages((prev) => {
            const updated = [...prev, { ...msg, createdAt: new Date() }];
            setMessagesCache(prevCache => ({
                ...prevCache,
                [selectedFriend._id]: updated
            }));
            return updated;
        });
        setInput("");
    };


    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <hgroup className={styles.hgroup}>
                    <h2>{t("messages.msg")}</h2>
                    <h6 className={styles.color}>{t("messages.exchange")}</h6>
                </hgroup>
                <div className={styles.inbox}>
                    <div className={styles.friends_list}>
                        <ConnectionsComponents onSelectedFriend={setSelectedFriend} />
                    </div>

                    <div className={styles.messages_list}>
                        <h6 className={styles.color + ' ' + styles.title}>
                            {selectedFriend
                                ? `${t("messages.chatwith")} ${selectedFriend.firstname}`
                                : `${t("messages.selectFriend")}`}
                        </h6>
                        <div className={styles.current_inbox}>
                            {messages.length === 0 && <p>{t("messages.nomsg")}</p>}
                            {messages.map((msg, index) => {
                                const isSent = msg.sender === user._id;

                                return (
                                    <div key={msg._id || index} className={`${styles.message} ${isSent ? styles.sent : styles.received}`}>
                                        <strong>{isSent ? `${t("messages.me")}` : selectedFriend.firstname}: </strong>
                                        {msg.content}
                                        <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
                                    </div>
                                );
                            })}
                            {selectedFriend && (
                                <div className={styles.write}>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={t("messages.writeMsg")}
                                    />
                                    <button onClick={sendMessage} className={styles.send_btn}>
                                        {t("messages.send")}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}