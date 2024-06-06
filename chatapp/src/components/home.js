import React from 'react'
import { useState, useRef, useContext, useEffect } from 'react'
import modeContext from '../context/Dark_lightMode/modeContext';
import { useNavigate } from 'react-router-dom';
import MessageComponent from './MessageComponent';
import UserComponent from './UserComponent';
import SeachUserComponent from './SearchUserComponent';
import '../CSS/style.css'
import { toast } from 'react-toastify'
import ModalSearch from './ModalSearch'
const audio1 = new Audio('ting.mp3')
const audio2 = new Audio('Tick.mp3')

export default function Home(props) {
    const navigate = useNavigate();

    if (!localStorage.getItem('token')) {
        // toast.error("Please Login First!");
        navigate('/login');
    }
    const context = useContext(modeContext);
    const { mode } = context;

    const [search_user, set_search_user] = useState([]);
    const [message, setmessage] = useState({ message: "" });
    const [users, setusers] = useState([]);
    const [chat_ids, set_chat_ids] = useState([]);
    const [group_chat_ids, set_group_chat_ids] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const [recvMsg, setRecvMsg] = useState([{message:"welcome",user_id:"fajjfjl5446alkfkjajf555",time_stamp:"12-03-24 pm",date:"12/03/2024"}]);


    //References;
    const setInput = useRef(null);
    const setInput2 = useRef(null);
    const setInput3 = useRef(null);
    const setInput4 = useRef(null);
    const type_ref = useRef(null);
    const message_ref = useRef(null);
    const open_modal_ref = useRef(null);
    const close_modal_ref = useRef(null);
    const open_broadcast_modal = useRef(null);
    const close_broadcast_modal = useRef(null);
    const welcome_note = useRef(null);


    const handleChange = (e) => {
        setmessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("message : ", message.message, " type : ", typeof (message.message));
        setInput.current.value = "";
        if (message.message.length) {
            props.socket.emit('send_message', { msg: message.message, chat_id: localStorage.getItem('chat_id'), user_id: localStorage.getItem('user_id') });
            // setRecvMsg([...recvMsg, { 'message': message.message, 'class': 'right' }]);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setInput2.current.value = "";
        // console.log("User Name : ", message.message, " type : ", typeof (message.message));
        const userName = message.message;
        if (userName.length) {
            console.log("Search User name :", userName);
            console.log("Users : ", users);

            const timeout = setTimeout(() => {
                toast.error('No User Found!');
            }, 1000);

            users.forEach((user) => {
                console.log("user : ", user);
                console.log("User name in to the loop  ", user.name);
                if (user.name === userName) {
                    setSearchUsers([{ user_name: userName, user_id: user._id }]);
                    toast.info("User found");
                    clearTimeout(timeout);
                }
            })
        }
        console.log("Search user : ", searchUsers);
    }

    //Search for create chat between two user.
    const handleSearchSubmit = (user_id) => {
        console.log("Called handle search submit : ", user_id);
        setSearchUsers([]);

        const user_id1 = user_id;
        const user_id2 = localStorage.getItem('user_id');
        const user_id_list = [user_id1, user_id2];
        console.log("User id 1 : ", user_id1, " user id2 : ", user_id2);
        props.socket.emit('create_group', { user_id: user_id_list });
    }

    //Handles the cross button in serarch component;
    const handleCross = () => {
        console.log("called handle cross ");
        setSearchUsers([]);
    }

    //Handles the cross button in modal
    const handleCrossModal = (user_id) => {
        let i = 0;
        for (i = 0; i < searchUsers.length; i++) {
            if (searchUsers[i].user_id === user_id) {
                break;
            }
        }
        searchUsers.splice(i, 1);
    }

    //Already have chat id between two user and want to start chat.
    const handleClick = (chat_id) => {
        type_ref.current.style.display = 'block';
        message_ref.current.style.display = 'block';
        welcome_note.current.style.display = 'none';

        setRecvMsg([]);

        localStorage.setItem('chat_id', chat_id);
        console.log("Chat id handle click : ", chat_id, " User id handle click : ", localStorage.getItem('user_id'));
        props.socket.emit('create_group', { chat_id: chat_id, user_id: localStorage.getItem('user_id') });
    }

    //Already have chat id, want to continue chat.
    const handleClickGroup = (chat_id) => {
        type_ref.current.style.display = 'block';
        message_ref.current.style.display = 'block';
        welcome_note.current.style.display = 'none';

        setRecvMsg([]);

        localStorage.setItem('chat_id', chat_id);
        console.log("Chat id handle click group : ", chat_id, " User id handle click group : ", localStorage.getItem('user_id'));
        props.socket.emit('create_group', { chat_id: chat_id, user_id: localStorage.getItem('user_id') });
    }

    //Handles the request for creating group.
    const handleCreateGroup = () => {
        console.log("Called handleCreateGroup");
        open_modal_ref.current.click();
    }

    //Handles the request for broadcasting a message;
    const handleBroadCast = () => {
        console.log("Called handleBroadCast");
        open_broadcast_modal.current.click();
    }

    //Handles the request for broadcast message.
    const handleBroadCastMessage=()=>{
        console.log("broad cast message : ",message.message);

        props.socket.emit('broadcast',message.message);

        setInput4.current.value = '';
        close_broadcast_modal.current.click();
    }

    //Handles each search request for adding the member into the group;
    const handleGroupMember = (e) => {
        e.preventDefault();
        console.log("called handle group member");

        setInput3.current.value = '';
        console.log("user name : ", message.message);

        const userName = message.message;
        if (userName.length) {
            console.log("Search User name :", userName);
            console.log("Users : ", users);

            const timeout = setTimeout(() => {
                toast.error('No User Found!');
            }, 800);

            users.forEach((user) => {
                console.log("user : ", user);
                console.log("User name in to the loop  ", user.name);
                if (user.name === userName) {
                    set_search_user([...search_user, { user_name: userName, user_id: user._id }]);
                    toast.info("User found");
                    clearTimeout(timeout);
                    console.log("search_user : ", search_user);
                }
            })
        }
    }

    //Use to clear the modal body
    const handleModalClose = () => {
        set_search_user([]);
    }

    //Use to send the list of group members into the backend.
    const handleSendMembers = () => {
        console.log("handle send members called");
        console.log("member list : ", search_user);

        // set_search_user([]);
        close_modal_ref.current.click();

        const user_id_list = search_user.map((user) => {
            return user.user_id;
        })

        user_id_list.push(localStorage.getItem('user_id'));

        props.socket.emit('create_group', { user_id: user_id_list });
    }

    useEffect(() => {
        const user_connected_listner = (user) => {
            console.log("socket id : ", props.socket.id);
            console.log("New user joined : ", user);
            setusers(user);
            // toast.info(`${user[user.length-1].name} has Joined the chat`);
        }
        const received_message_listner = (message) => {
            console.log("called received message");
            console.log("Message: ", message);
            if(recvMsg !== null && recvMsg !== undefined){
                setRecvMsg([...recvMsg,message]);
            }
            else{
                setRecvMsg([message]);
            }


            if(message.user_id !==  localStorage.getItem('user_id')){
                // console.log("Into audio play condition");
                audio1.play();
            }
            else{
                audio2.play();
            }
        }
        const create_group_listner = (data) => {
            localStorage.setItem('chat_id', data.chat_id);
            console.log("Chat id received : ", data.chat_id);
        }

        const initial_chat_listner = (chats) => {
            console.log("prev chats : ", chat_ids);
            set_chat_ids(chats)
            setTimeout(() => {
                console.log("after chats : ", chat_ids);
            }, 3000);
        }
        const chat_listner = (chat) => {
            console.log("prev chats : ", chat_ids);
            set_chat_ids([...chat_ids, chat])
            setTimeout(() => {
                console.log("after chats : ", chat_ids);
            }, 3000);
        }
        const initial_group_chat_listner = (chat) => {
            console.log("prev group chats : ", group_chat_ids);
            set_group_chat_ids(chat)
            setTimeout(() => {
                console.log("after group  chats : ", group_chat_ids);
            }, 3000);
        }
        const after_group_chat_listner = (chat) => {
            console.log("prev group chats : ", group_chat_ids);
            set_group_chat_ids([...group_chat_ids, chat])
            setTimeout(() => {
                console.log("after group  chats : ", group_chat_ids);
            }, 3000);
        }
        const broadcast_message_listner = (msg) => {
            console.log("broad cast message from server : ",msg);
            alert(msg);
        }
        const initial_message_listner = (msg) => {
            console.log("initial messages from server : ",msg);
            setRecvMsg(msg);
        }

        props.socket.on('user_connected', user_connected_listner);
        props.socket.on('received_message', received_message_listner);
        props.socket.on('created_group', create_group_listner);
        props.socket.on('initial_chat', initial_chat_listner);
        props.socket.on('after_chat', chat_listner);
        props.socket.on('initial_group_chat', initial_group_chat_listner);
        props.socket.on('after_group_chat', after_group_chat_listner);
        props.socket.on('broadcast_message', broadcast_message_listner);
        props.socket.on('initial_message', initial_message_listner);
        return () => {
            props.socket.off('user_connected', user_connected_listner);
            props.socket.off('received_message', received_message_listner);
            props.socket.off('created_group', received_message_listner);
            props.socket.off('initial_chat', initial_chat_listner);
            props.socket.off('after_chat', chat_listner);
            props.socket.off('initial_group_chat', initial_group_chat_listner);
            props.socket.off('after_group_chat', after_group_chat_listner);
            props.socket.off('broadcast_message', broadcast_message_listner);
            props.socket.off('initial_message', initial_message_listner);
        };
    })


    return (
        <>
            <button style={{display:'none'}} ref={open_broadcast_modal} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                            <h1 className="modal-title fs-5" id="staticBackdropLabel" style={{color: mode === 'dark' ? 'white' : 'black'}}>Broadcast your message</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                        <div className="search" style={{borderColor: mode === 'dark' ? '#0E3386' : 'black', color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                                <form className='type_form'>
                                    <div className='type_msg'>
                                        <input ref={setInput4} type="text" id='type' name='message' onChange={handleChange} style={{ border: `2px solid ${mode === 'dark' ? 'white' : 'black'}`, color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : 'white' }} />                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer" style={{backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                            <button ref={close_broadcast_modal} style={{display:'none'}} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleBroadCastMessage} type="button" className="btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>
            </div>
            <button ref={open_modal_ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: 'none' }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel" style={{color: mode === 'dark' ? 'white' : 'black'}}>Chose group members</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{color: mode === 'dark' ? 'white' : 'black'}}></button>
                        </div>
                        <div className="modal-body" style={{backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                            <div className="search" style={{borderColor: mode === 'dark' ? '#0E3386' : 'black', color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                                <form onSubmit={handleGroupMember} className='type_form'>
                                    <div className='type_msg'>
                                        <input ref={setInput3} type="text" id='type' name='message' onChange={handleChange} style={{ border: `2px solid ${mode === 'dark' ? 'white' : 'black'}`, color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : 'white' }} />
                                        <button type="submit" className='search_button' style={{ color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : 'white' }}><i className="fa-solid fa-magnifying-glass"></i></button>
                                    </div>
                                </form>
                            </div>

                            <div className="outer_Show_members" style={{borderColor: mode === 'dark' ? '#0E3386' : 'black', color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>

                                <div className='show_members'>
                                    {
                                        search_user.length > 0 ? search_user.map((user) => {
                                            return <ModalSearch message={{ name: user.user_name, class: 'left', user_id: user.user_id }} key={user.user_id} />
                                        }) : ''
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                            <button ref={close_modal_ref} onClick={handleModalClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ display: 'none' }}>Close</button>
                            <button onClick={handleSendMembers} type="button" className="btn btn-primary">Crerate group</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='chat_container'>
                <div className="search" style={{ color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                    <form onSubmit={handleSearch} className='type_form'>
                        <div className='type_msg'>
                            <input ref={setInput2} type="text" id='type' name='message' onChange={handleChange} style={{ border: `2px solid ${mode === 'dark' ? 'white' : 'black'}`, color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : 'white' }} />
                            <button type="submit" className='search_button' style={{ color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </form>
                </div>

                <div className="found" style={{ color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                    <div className="left_found">
                        {
                            searchUsers.length > 0 ? <SeachUserComponent cross={handleCross} press={handleSearchSubmit} message={{ name: searchUsers[0].user_name, class: 'left', user_id: searchUsers[0].user_id }} /> : ''
                        }
                    </div>
                    <div className="right_found">
                        <i className="fa-solid fa-people-group mbcast" onClick={handleCreateGroup}></i>
                        <i className="fa-solid fa-tower-broadcast mbcast" onClick={handleBroadCast}></i>
                    </div>
                    {/* <label htmlFor="type" style={{ color: mode === 'dark' ? 'white' : 'black' }}></label> */}
                </div>

                <div className='sidebar_up' style={{ color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                    {
                        chat_ids.length > 0 ? chat_ids.map((chat, index) => {
                            return <UserComponent name={`User${index + 1}`} handleClick={handleClick} chat_id={chat} key={index} />
                        }) : console.log(chat_ids)
                    }
                </div>
                <div className='sidebar_low' style={{ color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : '#FFFADA' }}>
                    {
                        group_chat_ids.length > 0 ? group_chat_ids.map((chat, index) => {
                            return <UserComponent name={`Group${index + 1}`} handleClick={handleClickGroup} chat_id={chat} key={index} />
                        }) : ''
                    }
                </div>

                {/* Message container for displaying messages. */}
                <div className="message_container" style={{ color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : '#FFF1E6' }}>
                    <h1 ref={welcome_note} className='welcome_heading'>Welcome to ChatApp</h1>
                    <div ref={message_ref} className="message_container_inner" style={{ display: 'none' }}>

                        {
                            recvMsg.length > 0 ? recvMsg.map((msg) => {
                                return <MessageComponent message={msg} class={msg.user_id === localStorage.getItem('user_id')?'right':'left'} key={Math.random()} />
                            }) : ''
                        }
                    </div>
                </div>

                {/* Bottom message type section. */}
                <div className="type_section" style={{ color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : '#F8EEEC' }}>
                    <form ref={type_ref} onSubmit={handleSubmit} className='type_form' style={{ display: 'none' }}>
                        <div className='type_msg'>
                            {/* <label htmlFor="type" style={{ color: mode === 'dark' ? 'white' : 'black' }}></label> */}
                            <input ref={setInput} type="text" id='type' name='message' onChange={handleChange} style={{ border: `2px solid ${mode === 'dark' ? 'white' : 'black'}`, color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? '#293340' : 'white' }} />
                            <button type="submit" className='send_button' style={{ backgroundColor: mode === 'dark' ? '#293340' : '#F8EEEC' }}><i className="fa-solid fa-paper-plane" style={{color: mode==='dark'?'white':'black'}}></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
