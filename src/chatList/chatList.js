import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';

import styles from './styles';
//const firebase = require('firebase');

class ChatListComponent extends React.Component{

    render(){
        const { classes } = this.props;
        
        if(this.props.chats.length > 0){
            return(
                <div className={classes.root}>
                    <Button variant="contained" fullWidth color="primary" className={classes.newChatBtn}
                    onClick={this.newChat}>New Message
                    </Button>
                    <List>
                        {
                            this.props.chats.map((_chat, _index) => {
                                return(
                                   <div key={_index}>
                                        <ListItem className={classes.listItem} align="flex-start"
                                    selected={this.props.selectedIndex === _index}>
                                        <ListItemAvatar>
                                <Avatar>{_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText 
                          primary={_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
                          secondary={
                            <React.Fragment>
                              <Typography component='span'
                                color='textPrimary'>
                                  {_chat.Messages[_chat.Messages.length - 1].Message.substring(0, 30) + ' ...'}
                              </Typography>
                            </React.Fragment>
                          }/>
                          {
                            _chat.receiverHasRead === false && !this.userIsSender(_chat) ? 
                            <ListItemIcon><NotificationImportant className={classes.unreadMessage}></NotificationImportant></ListItemIcon> :
                            null
                          }
                      </ListItem>
                      <Divider></Divider>
                                   </div>
                                )
                            })
                        }
                    </List>
                </div>
                );
        }else{
            return(
                <div className={classes.root}>
          <Button variant="contained" 
            fullWidth 
            color='primary' 
            onClick={this.newChat} 
            className={classes.newChatBtn}>
              New Message
          </Button>
          <List></List>
        </div>
            )
        }
        
    }
    userIsSender = (chat) => chat.Messages[chat.Messages.length - 1].sender === this.props.userEmail;
    newChat = () => this.props.newChatBtnFn();
    selectChat = (index) => this.props.selectChatFn(index);
}

export default withStyles(styles)(ChatListComponent);