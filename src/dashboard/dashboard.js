import React from 'react';
import ChatListComponent from '../chatList/chatList';
import { withStyles, Button } from '@material-ui/core';
import styles from './styles';

const firebase = require('firebase');


class DashboardComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedChat: null,
            newChatFormVisible: null,
            email: null,
            chats: []
        };
    }
    render(){
        const { classes } = this.props;
        return (
                <div>
                    <ChatListComponent history={this.props.history}
                newChatBtnFn={this.newChatBtnClicked}
                selectChatFn={this.selectChat}
                chats={this.state.chats}
                userEmail={this.state.email}
                selectedChatIndex={this.state.selectedChat}
                ></ChatListComponent>
                <Button className={classes.signOutBtn} onClick={this.signOut}>Sign Out</Button>
                </div>
            )
    }
    signOut(){
        firebase.auth().signOut();
    }
    selectChat(chatIndex){
        console.log('Selected Chat',chatIndex)
    }
    newChatBtnClicked(){
        this.setState({newChatFormVisible:true, selectChat:null})
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(async user =>{
            if(!user)
                this.props.history.push('/login')
            else{
                await firebase
                .firestore()
                .collection('chats')
                .where('users', 'array-contains', user.email)
                .onSnapshot(async res => {
                    const chats = res.docs.map(_doc => _doc.data());
                    await this.setState({
                        email: user.email,
                        chats: chats
                    });
                    console.log(this.state)
                })
            }
        })
    }
}

export default withStyles(styles)(DashboardComponent);