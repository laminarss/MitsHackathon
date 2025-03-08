import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import '../App.css'

const emails = ['username@gmail.com', 'user02@gmail.com', 'santhoshkumar67750@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disablePadding key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({fileInfo}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleSendEmail = () => {
    if (!selectedValue || !fileInfo) {
        alert("Please select an email and upload a file.");
        return;
    }
    console.log(fileInfo,selectedValue)
    const formData = new FormData();
    formData.append("receiver_email", selectedValue);  // Add email
    formData.append("file", fileInfo);            // Add file

    fetch("http://127.0.0.1:8000/send_email/", {
        method: "POST",
        body: formData, // Use FormData, not JSON
    })
    .then(response => response.json())
    .then(data => console.log(data.result))
    .catch(e => console.log("Error:", e));
  };


  return (
    <div>
        <div className='EmailChildComponent'>
            {selectedValue && (<Typography variant="subtitle1" component="div">
                Selected: {selectedValue}
            </Typography>)}
            <br />
            {!selectedValue && (<Button variant="outlined" onClick={handleClickOpen}>
                Select Email
            </Button>)}
            {selectedValue && (<Button style={{marginBottom:2}} variant="outlined" onClick={handleSendEmail}>
                Send Email
            </Button>)}
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
            {
              selectedValue && (<Button variant="outlined" color='error'
              onClick={()=>setSelectedValue(null)}
              >Clear Email</Button>)
            }
        </div>
    </div>
  );
}